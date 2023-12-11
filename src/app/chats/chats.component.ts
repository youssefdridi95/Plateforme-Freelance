import { Component, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ChatsService } from '../services/chats.service';
import { RxStompService } from '../rx-stomp.service';
import { Message } from '@stomp/stompjs';
import { NgZone } from '@angular/core';
import { NotificationMessageListService } from '../notification-message-list.service';
import { ActivatedRoute } from '@angular/router';

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

  textMsg = ''
 isLoading =false
 isSending =false
activeId :any
  constructor(private route :ActivatedRoute,protected chatsService: ChatsService, private rxStompService: RxStompService, private ngZone: NgZone,private notif :NotificationMessageListService) {
    this.route.paramMap.subscribe(params =>{this.activeId=params.get('activeId')

  
  })

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
      let  chats = []
      console.log('avant for ',res);
      
        for (let chat of res) {
        
          this.chatsService.getUsername(chat.firstUserId).subscribe(
            (res: any) => {
              chat['fUsername'] = res.username
              chat.fUser = res

            },
            (err: any) => {
              console.log(err);
            });
          this.chatsService.getUsername(chat.secondUserId).subscribe(
            (res: any) => {
              chat['sUsername'] = res.username
              chat.sUser= res
              

            },
            (err: any) => {
              console.log(err);
            });

        }
        console.log('baaad l for ',res);
        this.chatsService.chatList = res
      },
      (err) => {
        console.log(err);
      });

      this.rxStompService.watch('/topic/chats/' + this.userid).subscribe((message: Message) => {
        let msg = JSON.parse(message.body)
  
        if ((this.chatsService.activeChat.chatId === msg.chatId)) {
          this.chatsService.activeChat.messageList.push(JSON.parse(message.body));
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
          this.notif.newMsgs+=1
          this.notif.playNotificationSound()
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
    this.isLoading=true
    this.chatsService.getChat(this.chatsService.chatList.at(index).chatId).subscribe(
      (res: any) => {
        let chat = res
        this.chatsService.getUsername(chat.firstUserId).subscribe(
          (res: any) => {
         
            chat['fUsername'] = res.username
            chat.fUser= res

          },
          (err: any) => {
            console.log(err);
          });
        this.chatsService.getUsername(chat.secondUserId).subscribe(
          (res: any) => {
            chat['sUsername'] = res.username
            chat.sUser= res

          },
          (err: any) => {
            console.log(err);
          });


        this.chatsService.chatList[index] = chat
        this.isLoading=false

        this.chatsService.activeChat = this.chatsService.chatList.at(index)

        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => {
            // Update the scrollTop property here
            this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;

            // Run change detection manually
            this.ngZone.run(() => { });
          });
        });

        this.chatsService.markMsgSeen(this.chatsService.chatList.at(index).chatId, this.userid).subscribe(
          (res) => {
          //  console.log(res);

          }, (err) => {
            console.log(err);

          })
      
      }, (err) => {
        console.log(err);

      })



console.log(this.chatsService.chatList);


  }
  onSendMessage() {
    
   if (this.textMsg!=='') 
    
   
   
    { this.isSending =true

    let receiverId = this.userid == this.chatsService.activeChat.firstUserId ? this.chatsService.activeChat.secondUserId : this.chatsService.activeChat.firstUserId
    let msg = {
      senderId: this.userid,
      chatId: this.chatsService.activeChat.chatId,
      reciverId: receiverId,
      replymessage: this.textMsg

    }

    this.rxStompService.publish({ destination: '/chats/addMessage/' + this.chatsService.activeChat.chatId, body: JSON.stringify(msg) });

    this.textMsg = ''
    this.isSending =false
  }


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
