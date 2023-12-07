import { Component, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ChatsService } from '../services/chats.service';
import { RxStompService } from '../rx-stomp.service';
import { Message } from '@stomp/stompjs';
import { NgZone } from '@angular/core';
import { NotificationMessageListService } from '../notification-message-list.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit, OnDestroy {
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  userid = sessionStorage.getItem('id')
  useridIN = ''
  username = ''
  chatList: any
  activeChat: any = {
    "chatId": "",
    "firstUserId": "",
    "secondUserId": "",
    "messageList": [

    ]
  }
  textMsg = ''


  constructor(private chatsService: ChatsService, private rxStompService: RxStompService, private ngZone: NgZone,private notif :NotificationMessageListService) {
    this.chatsService.connectUser(this.userid).subscribe(
      (res) => {
        // console.log(res);
      },
      (err) => {
        console.log(err);
      });


    window.addEventListener('beforeunload', this.onBeforeUnload.bind(this));

  }


  ngOnInit(): void {
    this.chatsService.getChatList(this.userid).subscribe(
      (res: any) => {
        let chats = []
        for (let chat of res) {
          this.chatsService.getUsername(chat.firstUserId).subscribe(
            (res: any) => {
              chat['fUsername'] = res.username
            },
            (err: any) => {
              console.log(err);
            });
          this.chatsService.getUsername(chat.secondUserId).subscribe(
            (res: any) => {
              chat['sUsername'] = res.username
            },
            (err: any) => {
              console.log(err);
            });


        }
        console.log(res);
        this.chatList = res
      },
      (err) => {
        console.log(err);
      });

      this.rxStompService.watch('/topic/chats/' + this.userid).subscribe((message: Message) => {
        let msg = JSON.parse(message.body)
  
        if ((this.activeChat.chatId === msg.chatId)) {
          this.activeChat.messageList.push(JSON.parse(message.body));
          this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
              // Update the scrollTop property here
              this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;

              // Run change detection manually
              this.ngZone.run(() => { });
            });
          });
        }else {
          this.notif.msgList.unshift(msg)
          
        }
      });
  }


  ngOnDestroy(): void {
    // Remove the event listener when the component is destroyed
    window.removeEventListener('beforeunload', this.onBeforeUnload.bind(this));

    this.chatsService.disConnectUser(this.userid).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      });
  }

  private onBeforeUnload(event: Event): void {
    // Handle cleanup logic here
    this.chatsService.disConnectUser(this.userid).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      });
  }

  setActivechat(index: any) {
    this.chatsService.getChat(this.chatList.at(index).chatId).subscribe(
      (res: any) => {
        let chat = res
        this.chatsService.getUsername(chat.firstUserId).subscribe(
          (res: any) => {
            chat['fUsername'] = res.username
          },
          (err: any) => {
            console.log(err);
          });
        this.chatsService.getUsername(chat.secondUserId).subscribe(
          (res: any) => {
            chat['sUsername'] = res.username
          },
          (err: any) => {
            console.log(err);
          });


        this.chatList[index] = chat
        this.activeChat = this.chatList.at(index)
        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => {
            // Update the scrollTop property here
            this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;

            // Run change detection manually
            this.ngZone.run(() => { });
          });
        });

        this.chatsService.markMsgSeen(this.chatList.at(index).chatId, this.userid).subscribe(
          (res) => {
            console.log(res);

          }, (err) => {
            console.log(err);

          })
      
      }, (err) => {
        console.log(err);

      })





  }
  onSendMessage() {
    let receiverId = this.userid == this.activeChat.firstUserId ? this.activeChat.secondUserId : this.activeChat.firstUserId
    let msg = {
      senderId: this.userid,
      chatId: this.activeChat.chatId,
      reciverId: receiverId,
      replymessage: this.textMsg

    }
    this.rxStompService.publish({ destination: '/chats/addMessage/' + this.activeChat.chatId, body: JSON.stringify(msg) });

    this.textMsg = ''


  }

  calculateTimeDifference(timestamp: string) {
    const currentTime = new Date();
    const parsedTimestamp = new Date(timestamp);

    // Calculate the time difference in milliseconds
    const timeDifference = currentTime.getTime() - parsedTimestamp.getTime();

    // Convert the time difference to seconds
    const secondsDifference = Math.floor(timeDifference / 1000);

    // Check if the time difference is more than a day (86400 seconds)
    if (secondsDifference >= 86400) {
      const days = Math.floor(secondsDifference / 86400);
      return `+${days}d`;
    }

    // Check if the time difference is more than a minute (60 seconds)
    if (secondsDifference >= 60) {
      const minutes = Math.floor(secondsDifference / 60);
      return `+${minutes}m`;
    }

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(secondsDifference / 3600);
    const remainingMinutes = Math.floor((secondsDifference % 3600) / 60);

    // Format the result
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    } else {
      return `${remainingMinutes}m`;
    }
  }

}
