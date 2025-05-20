import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { ChatComponent } from '../app/page-components/chat/chat.component';
import { SingleSocketChatService } from '../app/services/single-socket-chat/single-socket-chat.service';
import { SessionService } from '../app/services/session/session.service';
import { ChatMessage } from '../app/entities/ChatMessage';
import { ChatRoom } from '../app/entities/ChatRoom';
import { ChatSubscription } from '../app/entities/ChatSubscription';
import { SimpleUser } from '../app/entities/SimpleUser';
import { ChatFormComponent } from '../app/components/chat-form/chat-form.component';

describe('Chat Flow Integration', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let singleSocketChatService: jasmine.SpyObj<SingleSocketChatService>;
  let sessionService: jasmine.SpyObj<SessionService>;
  
  // Test data
  const testUser = new SimpleUser(1, 'TestUser', null);
  const testChatRoom1 = new ChatRoom(1, 1, 'Test Chat 1', [testUser], 0);
  const testChatRoom2 = new ChatRoom(2, 1, 'Test Chat 2', [testUser], 0);
  
  // Mock subjects
  const chatsLoadedSubject = new Subject<boolean>();
  const connectionEstablishedSubject = new Subject<boolean>();
  const chatListSubject = new Subject<any[]>();
  
  beforeEach(async () => {
    // Create spies for services
    singleSocketChatService = jasmine.createSpyObj('SingleSocketChatService', [
      'loadPrivateChats',
      'switchActiveSubscription',
      'loadHistory',
      'sendMessage',
      'updateLastOpenedChat',
      'loadPreviousMessages'
    ], {
      chatsLoaded: { asObservable: () => chatsLoadedSubject.asObservable() },
      connectionEstablished: { asObservable: () => connectionEstablishedSubject.asObservable() },
      chatList: { asObservable: () => chatListSubject.asObservable() },
      activeSubscription: null
    });
    
    sessionService = jasmine.createSpyObj('SessionService', ['getUser', 'getSimpleUser']);
    sessionService.getUser.and.returnValue(testUser);
    sessionService.getSimpleUser.and.returnValue(testUser);
    
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ChatComponent
      ],
      providers: [
        { provide: SingleSocketChatService, useValue: singleSocketChatService },
        { provide: SessionService, useValue: sessionService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should load private chats on initialization', () => {
    expect(singleSocketChatService.loadPrivateChats).toHaveBeenCalled();
  });
  
  it('should switch to the active chat when chats are loaded', fakeAsync(() => {
    // Simulate chats being loaded
    chatsLoadedSubject.next(true);
    tick();
    
    expect(singleSocketChatService.switchActiveSubscription).toHaveBeenCalledWith(1);
    expect(singleSocketChatService.loadHistory).toHaveBeenCalled();
  }));
  
  it('should send a message', () => {
    const messageText = 'Hello, world!';
    component.sendMessage(messageText);
    
    expect(singleSocketChatService.sendMessage).toHaveBeenCalledWith(testUser, messageText);
    expect(component.newMessage).toBe('');
  });
  
  it('should not send a message if user is not logged in', () => {
    sessionService.getSimpleUser.and.returnValue(null);
    
    component.sendMessage('Hello, world!');
    
    expect(singleSocketChatService.sendMessage).not.toHaveBeenCalled();
  });
  
  it('should switch to another chat when requested', () => {
    component.switchChat(2);
    
    expect(component.chatId).toBe(2);
    expect(singleSocketChatService.switchActiveSubscription).toHaveBeenCalledWith(2);
    expect(singleSocketChatService.loadHistory).toHaveBeenCalled();
  });
  
  it('should load more messages when requested', () => {
    component.loadMore();
    
    expect(singleSocketChatService.loadPreviousMessages).toHaveBeenCalled();
  });
  
  it('should update last opened chat on destroy', () => {
    component.ngOnDestroy();
    
    expect(singleSocketChatService.updateLastOpenedChat).toHaveBeenCalled();
  });
  
  it('should toggle chat form visibility', () => {
    expect(component.createNewChatOpen).toBeFalse();
    
    component.startChatFormOpen();
    expect(component.createNewChatOpen).toBeTrue();
    
    component.startChatFormOpen();
    expect(component.createNewChatOpen).toBeFalse();
  });
  
  it('should close chat form when onNewChatClose is called', () => {
    component.createNewChatOpen = true;
    component.onNewChatClose();
    
    expect(component.createNewChatOpen).toBeFalse();
  });
  
  it('should close chat form when onNewChatCreate is called', () => {
    component.createNewChatOpen = true;
    component.onNewChatCreate();
    
    expect(component.createNewChatOpen).toBeFalse();
  });
});