import {ChatRoom} from "./ChatRoom";
import {BehaviorSubject, Observable} from "rxjs";
import {ChatMessage} from "./ChatMessage";

export class ChatSubscription {
    chat: ChatRoom;
    protected messagesSubjects: BehaviorSubject<ChatMessage[]>;
    messages$: Observable<ChatMessage[]>;
    protected unread: BehaviorSubject<number>;
    unread$:Observable<number>

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

    addMessagesToBeginning(newMessages: ChatMessage[]) {
        let messages = this.messagesSubjects.getValue()
        messages = newMessages.concat(messages)
        this.messagesSubjects.next(messages)
    }

    clearMessages() {
      this.messagesSubjects.next([])
    }
}
