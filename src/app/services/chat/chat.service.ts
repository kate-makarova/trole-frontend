import { Injectable } from '@angular/core';
import {ChatRoom} from "../../entities/ChatRoom";
import {APIService} from "../apiservice/apiservice.service";
import {ChatSubscription} from "../../entities/ChatSubscription";
import {Observable, of, Subject} from "rxjs";
import {ChatSubscriptionSimple} from "../../entities/ChatSubscriptionSimple";

@Injectable({
  providedIn: 'root'
})
export class ChatService extends APIService {
  chatSubscriptions: ChatSubscription[] = []
  init = new Subject<boolean>();

  initiateChats(userId: number): void {
    console.log('Initiation')
    this.getData<ChatRoom[]>('active-chats/'+userId).subscribe((chats: ChatRoom[]) => {
      for (let chat of chats) {
        this.chatSubscriptions.push(new ChatSubscription(chat))
      }
      console.log(this.chatSubscriptions)
      this.init.next(true)
    })
  }

  getChatSubscription(id: number): ChatSubscription|undefined {
    return this.chatSubscriptions.find((subscription: ChatSubscription) => {return subscription.id === id})
  }

  getChats(): ChatSubscriptionSimple[] {
    let data = []
    for (let subscription of this.chatSubscriptions) {
      data.push({id: subscription.chat.id, title: subscription.chat.title, unread$: subscription.unread$})
    }
    return data
  }

  stopChats() {
    for (let [index, subscription] of this.chatSubscriptions.entries()) {
      subscription.kill()
      delete this.chatSubscriptions[index]
    }
  }

}
