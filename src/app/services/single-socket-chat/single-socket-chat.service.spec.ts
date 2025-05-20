import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';

import { SingleSocketChatService } from './single-socket-chat.service';
import { SessionService } from '../session/session.service';
import { SocketService } from '../socket/socket.service';
import { ChatMessage } from '../../entities/ChatMessage';
import { ChatRoom } from '../../entities/ChatRoom';
import { ChatSubscription } from '../../entities/ChatSubscription';
import { SimpleUser } from '../../entities/SimpleUser';
import { environment } from '../../../environments/environment';

describe('SingleSocketChatService', () => {
  let service: SingleSocketChatService;
  let httpMock: HttpTestingController;
  let sessionServiceMock: jasmine.SpyObj<SessionService>;
  let routerMock: jasmine.SpyObj<Router>;
  let socketServiceMock: jasmine.SpyObj<SocketService<ChatMessage>>;

  // Test data
  const testUser = new SimpleUser(1, 'TestUser', null);
  const testChatRoom = new ChatRoom(1, 1, 'Test Chat', [testUser], 0);
  const testMessage = new ChatMessage(1, 1, 'user_message', testUser, 'Hello, world!', new Date().toISOString());

  // Mock socket events
  const mockMessageSubject = new Subject<ChatMessage>();
  const mockOpenSubject = new Subject<any>();

  beforeEach(() => {
    // Create mock for SessionService
    sessionServiceMock = jasmine.createSpyObj('SessionService', ['getToken', 'getUser']);
    sessionServiceMock.getToken.and.returnValue('test-token');
    sessionServiceMock.getUser.and.returnValue(testUser);

    // Create mock for Router
    routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);

    // Create mock for SocketService
    socketServiceMock = jasmine.createSpyObj('SocketService', [
      'connect', 
      'sendMessage', 
      'onMessage', 
      'onOpen', 
      'closeConnection'
    ]);

    socketServiceMock.onMessage.and.returnValue(mockMessageSubject.asObservable());
    socketServiceMock.onOpen.and.returnValue(mockOpenSubject.asObservable());

    // Configure TestBed
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    // Get service and HTTP mock
    service = TestBed.inject(SingleSocketChatService);
    httpMock = TestBed.inject(HttpTestingController);

    // Replace the SocketService instance with our mock
    service.socket = socketServiceMock;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('connection management', () => {
    it('should establish connection when connect is called', () => {
      service.subscriptions = [new ChatSubscription(testChatRoom)];
      service.connect();

      expect(socketServiceMock.connect).toHaveBeenCalledWith(
        jasmine.stringMatching(environment.websocketUrl + '?token=1&userName=TestUser&chatIds=1')
      );
    });

    it('should not connect if user is not logged in', () => {
      sessionServiceMock.getUser.and.returnValue(null);
      service.connect();

      expect(socketServiceMock.connect).not.toHaveBeenCalled();
    });

    it('should update connectionEstablished when socket opens', () => {
      expect(service.connectionEstablished.value).toBeFalse();

      mockOpenSubject.next({});

      expect(service.connectionEstablished.value).toBeTrue();
    });

    it('should close connection when kill is called', () => {
      service.kill();

      expect(socketServiceMock.sendMessage).toHaveBeenCalledWith(
        jasmine.objectContaining({
          type: 'user_offline',
          user: testUser
        })
      );
      expect(socketServiceMock.closeConnection).toHaveBeenCalled();
    });
  });

  describe('chat management', () => {
    it('should load private chats', () => {
      service.loadPrivateChats();

      const req = httpMock.expectOne(`${environment.apiHost}active-chats`);
      expect(req.request.method).toBe('GET');
      req.flush([testChatRoom]);

      expect(service.subscriptions.length).toBe(1);
      expect(service.subscriptions[0].chat).toEqual(testChatRoom);
      expect(service.chatsLoaded.value).toBeTrue();
    });

    it('should update chat list when updateChatList is called', () => {
      service.subscriptions = [new ChatSubscription(testChatRoom)];
      service.updateChatList();

      expect(service.chatList.value.length).toBe(1);
      expect(service.chatList.value[0].id).toBe(testChatRoom.id);
      expect(service.chatList.value[0].title).toBe(testChatRoom.title);
    });

    it('should switch active subscription', () => {
      service.subscriptions = [new ChatSubscription(testChatRoom)];
      service.switchActiveSubscription(testChatRoom.id);

      expect(service.activeSubscription).not.toBeNull();
      expect(service.activeSubscription?.chat.id).toBe(testChatRoom.id);

      // Should send user_online and get_users_online messages
      expect(socketServiceMock.sendMessage).toHaveBeenCalledTimes(2);
      expect(socketServiceMock.sendMessage.calls.argsFor(0)[0].type).toBe('user_online');
      expect(socketServiceMock.sendMessage.calls.argsFor(1)[0].type).toBe('get_users_online');
    });

    it('should update last opened chat', () => {
      service.subscriptions = [new ChatSubscription(testChatRoom)];
      service.switchActiveSubscription(testChatRoom.id);
      service.updateLastOpenedChat();

      const req = httpMock.expectOne(`${environment.apiHost}last-open-chat/update`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ chat_id: testChatRoom.id });
      req.flush({});
    });

    it('should not update last opened chat if no active subscription', () => {
      service.activeSubscription = null;
      service.updateLastOpenedChat();

      httpMock.expectNone(`${environment.apiHost}last-open-chat/update`);
    });
  });

  describe('message handling', () => {
    beforeEach(() => {
      service.subscriptions = [new ChatSubscription(testChatRoom)];
      service.switchActiveSubscription(testChatRoom.id);
    });

    it('should send message', () => {
      service.sendMessage(testUser, 'Test message');

      expect(socketServiceMock.sendMessage).toHaveBeenCalledWith(
        jasmine.objectContaining({
          chatId: testChatRoom.id,
          type: 'user_message',
          user: testUser,
          text: 'Test message'
        })
      );

      // Should add message to active subscription
      expect(service.activeSubscription?.messagesSubjects.value.length).toBe(1);
    });

    it('should not send message if no active subscription', () => {
      service.activeSubscription = null;
      service.sendMessage(testUser, 'Test message');

      expect(socketServiceMock.sendMessage).not.toHaveBeenCalled();
    });

    it('should handle incoming user_message', () => {
      const incomingMessage = new ChatMessage(
        testChatRoom.id, 
        2, 
        'user_message', 
        testUser, 
        'Incoming message', 
        new Date().toISOString()
      );

      mockMessageSubject.next(incomingMessage);

      expect(service.activeSubscription?.messagesSubjects.value.length).toBe(1);
      expect(service.activeSubscription?.messagesSubjects.value[0].text).toBe('Incoming message');
    });

    it('should handle incoming user_online message', () => {
      const onlineMessage = new ChatMessage(
        testChatRoom.id, 
        null, 
        'user_online', 
        testUser, 
        '', 
        null
      );

      mockMessageSubject.next(onlineMessage);

      expect(service.activeSubscription?.activeUsers.getValue().length).toBe(1);
      expect(service.activeSubscription?.activeUsers.getValue()[0].id).toBe(testUser.id);
    });

    it('should handle incoming user_offline message', () => {
      // First add the user as online
      const onlineMessage = new ChatMessage(
        testChatRoom.id, 
        null, 
        'user_online', 
        testUser, 
        '', 
        null
      );
      mockMessageSubject.next(onlineMessage);

      // Then make them offline
      const offlineMessage = new ChatMessage(
        testChatRoom.id, 
        null, 
        'user_offline', 
        testUser, 
        '', 
        null
      );
      mockMessageSubject.next(offlineMessage);

      expect(service.activeSubscription?.activeUsers.getValue().length).toBe(0);
    });

    it('should handle incoming users_currently_online message', () => {
      const onlineUsers = [
        new SimpleUser(1, 'User1', null),
        new SimpleUser(2, 'User2', null)
      ];

      const onlineMessage = new ChatMessage(
        testChatRoom.id, 
        null, 
        'users_currently_online', 
        null, 
        JSON.stringify(onlineUsers), 
        null
      );

      mockMessageSubject.next(onlineMessage);

      expect(service.activeSubscription?.activeUsers.getValue().length).toBe(2);
    });

    it('should increment global unread count when chat is not open', () => {
      // Set open to false
      service.open = false;

      const incomingMessage = new ChatMessage(
        testChatRoom.id, 
        2, 
        'user_message', 
        testUser, 
        'Incoming message', 
        new Date().toISOString()
      );

      expect(service.globalUnread.value).toBe(0);

      mockMessageSubject.next(incomingMessage);

      expect(service.globalUnread.value).toBe(1);
    });
  });

  describe('history loading', () => {
    beforeEach(() => {
      service.subscriptions = [new ChatSubscription(testChatRoom)];
      service.switchActiveSubscription(testChatRoom.id);
    });

    it('should load history when loadHistory is called', () => {
      spyOn(service, 'loadPreviousMessages');

      service.loadHistory();

      expect(service.loadPreviousMessages).toHaveBeenCalled();
      expect(service.activeSubscription?.historyLoaded).toBeTrue();
      expect(service.activeSubscription?.currentHistoryPage).toBe(1);
    });

    it('should not load history if already loaded', () => {
      spyOn(service, 'loadPreviousMessages');

      if (service.activeSubscription) {
        service.activeSubscription.historyLoaded = true;
      }

      service.loadHistory();

      expect(service.loadPreviousMessages).not.toHaveBeenCalled();
    });

    it('should load previous messages', () => {
      const historyMessages = [
        new ChatMessage(testChatRoom.id, 3, 'user_message', testUser, 'Old message 1', new Date().toISOString()),
        new ChatMessage(testChatRoom.id, 2, 'user_message', testUser, 'Old message 2', new Date().toISOString())
      ];

      service.loadPreviousMessages();

      const req = httpMock.expectOne(`${environment.apiHost}private-chat-messages/1/2`);
      expect(req.request.method).toBe('GET');
      req.flush(historyMessages);

      expect(service.activeSubscription?.messagesSubjects.value.length).toBe(2);
      expect(service.activeSubscription?.currentHistoryPage).toBe(2);
    });

    it('should set canBeMore to false when no more messages', () => {
      service.loadPreviousMessages();

      const req = httpMock.expectOne(`${environment.apiHost}private-chat-messages/1/2`);
      expect(req.request.method).toBe('GET');
      req.flush([]); // Empty response means no more messages

      expect(service.activeSubscription?.canBeMore).toBeFalse();
    });
  });

  describe('data retrieval', () => {
    it('should get global unread count', () => {
      service.getGlobalUnread();

      const req = httpMock.expectOne(`${environment.apiHost}total-private-unread`);
      expect(req.request.method).toBe('GET');
      req.flush(5);

      expect(service.globalUnread.value).toBe(5);
    });

    it('should get last opened chat', () => {
      service.getLastOpenedChat();

      const req = httpMock.expectOne(`${environment.apiHost}last-open-chat`);
      expect(req.request.method).toBe('GET');
      req.flush(1);

      expect(service.lastOpenedChat.value).toBe(1);
    });

    it('should load header chat data', () => {
      service.loadHeaderChatData();

      const req = httpMock.expectOne(`${environment.apiHost}header-chat-data`);
      expect(req.request.method).toBe('GET');
      req.flush({ unread: 3, last_chat: 1 });

      expect(service.globalUnread.value).toBe(3);
      expect(service.lastOpenedChat.value).toBe(1);
    });

    it('should create a new chat', () => {
      const chatData = { title: 'New Chat', users: [1, 2] };

      service.create(chatData);

      const req = httpMock.expectOne(`${environment.apiHost}private-chat/create`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(chatData);
      req.flush({ success: true });

      // Should reload private chats after creation
      const chatsReq = httpMock.expectOne(`${environment.apiHost}active-chats`);
      chatsReq.flush([]);
    });
  });

  describe('cleanup', () => {
    it('should clean up resources on destroy', () => {
      spyOn(service, 'kill');

      service.ngOnDestroy();

      expect(service.kill).toHaveBeenCalled();
    });
  });
});
