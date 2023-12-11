import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationMessageListService {
  msgList :any =[
  
  ]
  newMsgs = 0
  notificationSound = new Audio('../assets/notif.wav');
  playNotificationSound() {
    this.notificationSound.play();
  }
  constructor() { }
}
