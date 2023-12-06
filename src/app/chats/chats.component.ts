import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatsService } from '../services/chats.service';
import { RxStompService } from '../rx-stomp.service';
import { Message } from '@stomp/stompjs';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit, OnDestroy {

  userid = '657056d61d682a25318b6194'
  username = ''
  chatList :any
  activeChat :any={
    "chatId": "",
    "firstUserId": "",
    "secondUserId": "",
    "messageList": [
 
    ]
}
textMsg =''
  constructor(private chatsService: ChatsService,private rxStompService: RxStompService) {
    this.chatsService.connectUser(this.userid).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      });

      this.chatsService.getUsername(this.userid).subscribe(
        (res:any) => {
          this.username= res.username
          console.log(this.username );
        },
        (err) => {
          console.log(err);
        });
    // Add event listener for window unload
    window.addEventListener('beforeunload', this.onBeforeUnload.bind(this));
    console.log(this.chatsService.getUsername('657056d61d682a25318b6194'));
    
    this.chatsService.subscribeToChat(this.activeChat.chatId, this.displayMessage);
  }

  displayMessage(message: any): void {
    console.log(message);
    // Handle the received message as needed
  }

  ngOnInit(): void {
      this.chatsService.getChatList(this.userid).subscribe(
        (res:any) => {
          let chats= []
          for(let chat of res)
          {
          this.chatsService.getUsername(chat.firstUserId).subscribe(
            (res:any) => {
              chat['fUsername']= res.username
            },
            (err:any) => {
              console.log(err);
            });
            this.chatsService.getUsername(chat.secondUserId).subscribe(
              (res:any) => {
                chat['sUsername']= res.username
              },
              (err:any) => {
                console.log(err);
              });
     

          }
          console.log(res);
      this.chatList = res
    },
    (err) => {
      console.log(err);
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
    this.chatsService.disConnectUser('657056ff1d682a25318b6196').subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      });
  }
  receivedMessages: string[] = [];
  setActivechat(index:any){
      this.activeChat=this.chatList.at(index)
      console.log('active',  this.activeChat);
      this.rxStompService.watch('/topic/chats/'+ this.activeChat.chatId).subscribe((message: Message) => {
        console.log(message);
        
        this.receivedMessages.push(message.body);
        console.log(this.receivedMessages);
        
      });
  
  }
  onSendMessage() {
    let receiverId =this.userid==this.activeChat.firstUserId? this.activeChat.secondUserId:this.activeChat.firstUserId
console.log('eceiver',receiverId);

    this.rxStompService.publish({ destination: '/chats/addMessage/' + this.activeChat.chatId, body: JSON.stringify({
      senderId:  this.userid,
      reciverId: receiverId,
      replymessage:     this.textMsg
      ,
    }) });
  }
  sendMessage( ): void {
    console.log('ffffff');
    
    let receiverId =this.userid==this.activeChat.firstUserId? this.activeChat.secondUserId:this.activeChat.firstUserId
    // Send message using ChatsService
    this.chatsService.sendMessage(
      this.activeChat.chatId,
      this.userid,
      receiverId,
    this.textMsg
    );

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
