// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
