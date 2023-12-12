// auth.service.ts
import { Injectable } from '@angular/core';
import { ChatsService } from './chats.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private chatsService :ChatsService){}
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
