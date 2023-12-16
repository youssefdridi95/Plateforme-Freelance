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
export class ChatsComponent implements OnInit {
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  userid = ''
  useridIN = ''
  username = ''

  textMsg = ''
  isLoading = false
  isSending = false
  activeId: any
  constructor(private route: ActivatedRoute, protected chatsService: ChatsService, private rxStompService: RxStompService, private ngZone: NgZone, private notif: NotificationMessageListService) {
    // Usage example:

    let  id=JSON.parse(sessionStorage.getItem('user')!).id

    if(JSON.parse(sessionStorage.getItem('user')!).roles.at(0)=='ROLE_RECRUTER')
    id = JSON.parse(sessionStorage.getItem('user')!).idEntreprise
    this.userid = id

  }


  ngOnInit(): void {
    this.chatsService.getChatList(this.userid).subscribe(
      (res: any) => {


        this.chatsService.chatList = res
        console.log(res);

        this.route.paramMap.subscribe(params => {
          this.activeId = params.get('activeId')


          if (params.get('activeId') != null && this.getActiveId(params.get('activeId')) != null)
{
            this.chatsService.activeChat = res.at(this.getActiveId(params.get('activeId')))
            this.ngZone.runOutsideAngular(() => {
              setTimeout(() => {
                // Update the scrollTop property here
                this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
          
                // Run change detection manually
                this.ngZone.run(() => {});
              });
            });
          
}


        })
      },
      (err) => {
        console.log(err);
      });
// this.chatsService.watch();
this.chatsService.newMessageAdded.subscribe(() => {
  this.ngZone.runOutsideAngular(() => {
    setTimeout(() => {
      // Update the scrollTop property here
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;

      // Run change detection manually
      this.ngZone.run(() => {});
    });
  });
});
}
  
  





  setActivechat(index: any) {
    this.isLoading = true
    this.chatsService.getChat(this.chatsService.chatList.at(index).chat.chatId).subscribe(
      (res: any) => {
        let chat = res
        
        
        this.chatsService.chatList[index] = chat
        console.log(chat.sannonyme);
        console.log(chat.fannonyme);
        
        this.activeId=chat.chat.chatId
        this.isLoading = false
        
        this.chatsService.activeChat = this.chatsService.chatList.at(index)
        
        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => {
            // Update the scrollTop property here
            this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
            
            // Run change detection manually
            this.ngZone.run(() => { });
          });
        });
        
        this.lastSeenmsg()
        this.chatsService.markMsgSeen(this.chatsService.chatList.at(index).chat.chatId, this.userid).subscribe(
          (res) => {
            console.log('seeen',res);
            
          }, (err) => {
            console.log('senn errr',err);

          })

      }, (err) => {
        console.log(err);

      })

  }
  onSendMessage() {

    if (this.textMsg !== '') {
      this.isSending = true


      let receiverId = this.userid == this.chatsService.activeChat.chat.firstUserId ? this.chatsService.activeChat.chat.secondUserId : this.chatsService.activeChat.chat.firstUserId
      let msg = {
        senderId: this.userid,
        chatId: this.chatsService.activeChat.chat.chatId,
        reciverId: receiverId,
        replymessage: this.textMsg,
        time : new Date()
      }

      this.rxStompService.publish({ destination: '/chats/addMessage/' + this.chatsService.activeChat.chat.chatId, body: JSON.stringify(msg) });

      this.textMsg = ''
      this.isSending = false
    }


  }

  calculateTimeDifference(timestamp: string) {
  
    const start:any = new Date(timestamp);
    const end :any= new Date();


    // Calculate the difference in milliseconds
    const difference = Math.abs(end - start);


    let seconds :any = Math.floor((difference / 1000) % 60);
    let minutes :any = Math.floor((difference / (1000 * 60)) % 60);
    let hours :any = Math.floor((difference / (1000 * 60 * 60)) % 24);
    let days  :any= Math.floor(difference / (1000 * 60 * 60 * 24));


    if(days>0 )
   return days+'d'
    if (hours > 0)
    return hours+'h';
    if (minutes > 0)
    return minutes+'m'
    return seconds+'s'
  }
   calculateDuration(startDate :any, endDate:any) {
    const start:any = new Date(startDate);
    const end :any= new Date();

    // Calculate the difference in milliseconds
    const difference = Math.abs(end - start);


    let seconds :any = Math.floor((difference / 1000) % 60);
    let minutes :any = Math.floor((difference / (1000 * 60)) % 60);
    let hours :any = Math.floor((difference / (1000 * 60 * 60)) % 24);
    let days  :any= Math.floor(difference / (1000 * 60 * 60 * 24));


    if(days>0 )
   return days+'d'
    if (hours > 0)
    return hours+'h';
    if (minutes > 0)
    return minutes+'m'
    return seconds+'s'
}


  getActiveId(id: any) {

    for (let index = 0; index < this.chatsService.chatList.length; index++) {
      const chat = this.chatsService.chatList[index];
      if (chat.chat.chatId == id) return index
    }
    return null
  }


  lastSeenmsg(){
    const messageList = this.chatsService.activeChat.chat.messageList;

// Find the index of the last seen message

for (let i = messageList.length - 1; i >= 0; i--) {
  const message = messageList[i];
  if (message.reciverId !== this.userid && message.seen) {
    
      return i;
  }
}

return undefined; // Return undefined if no matching message is found
}

onEnterKey(event: any): void {
  // Prevent the default behavior of Enter (preventing a new line in the input)
  event.preventDefault();

  // Append a newline character to the message
  this.textMsg += "\n";
  console.log(this.textMsg);
  
}
  }

