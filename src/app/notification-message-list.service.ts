import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationMessageListService {
  msgList :any =[
  
  ]
  newMsgs = 0
  notificationSound = new Audio('../assets/notif.mp3');
  playNotificationSound() {
    this.notificationSound.play();
  }
  constructor() { }
}
