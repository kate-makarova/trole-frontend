import {ChatRoom} from "./ChatRoom";
import {BehaviorSubject, Observable} from "rxjs";
import {SocketService} from "../services/socket/socket.service";
import {ChatMessage} from "./ChatMessage";
import {SimpleUser} from "./SimpleUser";

export class ChatSubscription {
    id: number;
    chat: ChatRoom;
    protected messagesSubjects: BehaviorSubject<ChatMessage[]>;
    messages$: Observable<ChatMessage[]>;
    socket: SocketService;
    protected unread: BehaviorSubject<number>;
    unread$:Observable<number>

    constructor(chat: ChatRoom
                ) {
        this.id = chat.id;
        this.chat = chat;
        this.messagesSubjects = new BehaviorSubject<ChatMessage[]>([])
        this.socket = new SocketService('chat/'+chat.id)
        this.unread = new BehaviorSubject(this.chat.unread)
        this.unread$ = this.unread.asObservable()
        this.socket.on<ChatMessage>('message', (data: ChatMessage) => {
            let messages = this.messagesSubjects.getValue()
            messages.push(data)
            this.messagesSubjects.next(messages)
            this.unread.next(this.unread.getValue() + 1)
        })
        this.messages$ = this.messagesSubjects.asObservable()
    }

    sendMessage(user: SimpleUser, message: string) {
        this.socket.emit('message', { text: message, user: user, time: new Date().toString() });
    }
}