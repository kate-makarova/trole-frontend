import {ChatRoom} from "./ChatRoom";
import {BehaviorSubject, Observable} from "rxjs";
import {ChatMessage} from "./ChatMessage";
import {SimpleUser} from "./SimpleUser";

export class ChatSubscription {
    chat: ChatRoom;
    protected messagesSubjects: BehaviorSubject<ChatMessage[]>;
    messages$: Observable<ChatMessage[]>;
    protected unread: BehaviorSubject<number>;
    unread$:Observable<number>
    historyLoaded: boolean = false;
    protected activeUsers: BehaviorSubject<SimpleUser[]> = new BehaviorSubject<SimpleUser[]>([]);
    activeUsers$: Observable<SimpleUser[]> = this.activeUsers.asObservable();

    constructor(chat: ChatRoom) {
        this.chat = chat;
        this.messagesSubjects = new BehaviorSubject<ChatMessage[]>([])
        this.unread = new BehaviorSubject(this.chat.unread)
        this.unread$ = this.unread.asObservable()
        this.messages$ = this.messagesSubjects.asObservable()
    }

    addMessage(message: ChatMessage) {
        const messages = [...this.messagesSubjects.getValue(), message];
        this.messagesSubjects.next(messages)
        this.unread.next(this.unread.getValue() + 1)
    }

    addUserOnline(user: SimpleUser) {
        const users = [...this.activeUsers.getValue(), user];
        this.activeUsers.next(users)
    }

    removeUserOnline(user: SimpleUser) {
        const users = this.activeUsers.getValue().filter(u => u.id !== user.id);
        this.activeUsers.next(users)
    }

    addMessagesToBeginning(newMessages: ChatMessage[]) {
        const currentMessages = this.messagesSubjects.getValue();
        const updatedMessages = [...newMessages, ...currentMessages];
        this.messagesSubjects.next(updatedMessages);
    }

    clearMessages() {
      this.messagesSubjects.next([])
    }

    getMessageCount() {
      return this.messagesSubjects.getValue().length
    }
}
