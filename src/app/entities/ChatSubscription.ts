import {ChatRoom} from "./ChatRoom";
import {BehaviorSubject, Observable} from "rxjs";
import {SocketService} from "../services/socket/socket.service";
import {ChatMessage} from "./ChatMessage";
import {User} from "./User";
import {SimpleUser} from "./SimpleUser";

export class ChatSubscription {
    id: number;
    chat: ChatRoom;
    protected messagesSubjects: BehaviorSubject<ChatMessage[]>;
    messages$: Observable<ChatMessage[]>;
    socket: SocketService<ChatMessage>;
    protected unread: BehaviorSubject<number>;
    unread$:Observable<number>

    constructor(chat: ChatRoom
                ) {
        this.id = chat.id;
        this.chat = chat;
        this.messagesSubjects = new BehaviorSubject<ChatMessage[]>([])
        this.socket = new SocketService<ChatMessage>()
        this.socket.connect('http://127.0.0.1:8001/ws/chat/'+chat.id+'/')
        this.unread = new BehaviorSubject(this.chat.unread)
        this.unread$ = this.unread.asObservable()
        this.socket.onMessage<ChatMessage>().subscribe((data: ChatMessage) => {
            let messages = this.messagesSubjects.getValue()
            if (data.type !== 'heartbeat') {
                messages.push(data)
                this.messagesSubjects.next(messages)
                this.unread.next(this.unread.getValue() + 1)
            }
        })
        this.messages$ = this.messagesSubjects.asObservable()
    }

    sendMessage(user: SimpleUser, message: string, type = 'chat_message') {
        console.log({
            text: message,
            user: user,
            time: new Date().toString(),
            type: type
        })
        this.socket.sendMessage({
            text: message,
            user: user,
            time: new Date().toString(),
            type: type
        });
    }

    kill() {
        this.socket.closeConnection()
    }
}