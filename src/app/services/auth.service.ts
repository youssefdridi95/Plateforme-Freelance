// auth.service.ts
import { Injectable } from '@angular/core';
import { ChatsService } from './chats.service';
import { NotificationMessageListService } from './../notification-message-list.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private chatsService :ChatsService,private notif :NotificationMessageListService){}
  navigate(arg0: string[]) {
      throw new Error('Method not implemented.');
  }
  private isAuthenticated = false;

  login() {
    if (sessionStorage.getItem('user'))
       this.isAuthenticated = true;
  }

  logout() {
    // Perform logout logic
    this.isAuthenticated = false;

 
    this.chatsService.disConnectUser(JSON.parse(sessionStorage.getItem('user')!).id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      });
      sessionStorage.removeItem('user');
      this.chatsService.chatSubscription.unsubscribe();
      this.notif.msgList =[]
      this.notif.newMsgs = 0
  }
  Authenticated(): boolean {
    this.login() ;
    return this.isAuthenticated;
  }
  getUser(): any | null {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  }
}
