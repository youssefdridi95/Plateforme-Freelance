import { ElementRef, Injectable, NgZone, ViewChild } from '@angular/core';
import { Env } from '../env';
import { environments } from 'src/enviroments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RxStompService } from '../rx-stomp.service';
import { NotificationMessageListService } from '../notification-message-list.service';
import { Message } from '@stomp/stompjs';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  private env: Env = environments as Env;
  chatList: any[]=[];
  userid = '';
  chatSubscription: any;
  activeChat: any = {
    chat: {
      chatId: '',
      firstUserId: '',
      secondUserId: '',
      messageList: [],
    },
    fannonyme: '',
    sannonyme: '',
    fstatus: '',
    sstatus: '',
  };
  newMessageAdded: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private http: HttpClient,
    private rxStompService: RxStompService,
    private notif: NotificationMessageListService,
    private ngZone: NgZone
  ) {}

  // connectUser(userId: any) {
  //   return this.http.post(this.env.backendUrl + this.env.connectUser, {
  //     "userId": userId
  //   })
  // }

  disConnectUser(userId: any) {
    return this.http.post(this.env.backendUrl + this.env.disConnectUser, {
      userId: userId,
    });
  }

  getChatList(userId: any) {
    // const params = new HttpParams()
    // .set('' ,userId)
    
    return this.http.get(this.env.backendUrl + this.env.chatList + userId);
  }
  getUsername(userId: any) {
    // const params = new HttpParams()
    // .set('' ,userId)

    return this.http.get(this.env.backendUrl + this.env.username + userId);
  }

  addChat(sUserId: any, fUserId: any) {
    console.log({
      firstUserId: fUserId,
      secondUserId: sUserId,
      messageList: [],
    });

    return this.http.post(this.env.backendUrl + this.env.createChat, {
      firstUserId: fUserId,
      secondUserId: sUserId,
      messageList: [],
    });
  }

  markMsgSeen(chatId: any, userId: any) {
    return this.http.post(
      this.env.backendUrl + this.env.markMessageSeen + chatId + '/' + userId,
      {}
    );
  }
  getChat(chatId: any) {
    // const params = new HttpParams()
    // .set('' ,userId)

    return this.http.get(this.env.backendUrl + this.env.chat + chatId);
  }
  watch() {
    let id = JSON.parse(sessionStorage.getItem('user')!).id;

    if (
      JSON.parse(sessionStorage.getItem('user')!).roles.at(0) == 'ROLE_RECRUTER'
    )
      id = JSON.parse(sessionStorage.getItem('user')!).idEntreprise;
    this.userid = id;
    if (this.userid)
      this.chatSubscription = this.rxStompService
        .watch('/topic/chats/' + this.userid)
        .subscribe((message: Message) => {
          let msg = JSON.parse(message.body);

          if (this.activeChat.chat.chatId === msg.chatId) {
            this.activeChat.chat.messageList.push(JSON.parse(message.body));

          //  this.notif.playNotificationSound();
            this.newMessageAdded.emit();
          } else {
            this.notif.msgList.unshift(msg);
            console.log('notif', this.notif.msgList);

            this.notif.newMsgs += 1;
            this.notif.playNotificationSound();
          }
        });
  }



}
