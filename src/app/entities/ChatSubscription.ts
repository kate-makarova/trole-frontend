import {ChatRoom} from "./ChatRoom";
import {BehaviorSubject, Observable} from "rxjs";
import {SocketService} from "../services/socket/socket.service";
import {ChatMessage} from "./ChatMessage";
import {User} from "./User";
import {SimpleUser} from "./SimpleUser";
import {SessionService} from "../services/session/session.service";

export class ChatSubscription {
    id: number;
    chat: ChatRoom;
    protected messagesSubjects: BehaviorSubject<ChatMessage[]>;
    messages$: Observable<ChatMessage[]>;
    protected unread: BehaviorSubject<number>;
    unread$:Observable<number>

    constructor(private sessionService: SessionService,
        chat: ChatRoom
                ) {
        this.id = chat.id;
        this.chat = chat;
        this.messagesSubjects = new BehaviorSubject<ChatMessage[]>([])
        this.unread = new BehaviorSubject(this.chat.unread)
        this.unread$ = this.unread.asObservable()
        this.messages$ = this.messagesSubjects.asObservable()
    }

    addMessage(message: ChatMessage) {
        let messages = this.messagesSubjects.getValue()
        messages.push(message)
        this.messagesSubjects.next(messages)
        this.unread.next(this.unread.getValue() + 1)
    }
}