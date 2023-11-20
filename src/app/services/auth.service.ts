// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  login() {
    if (sessionStorage.getItem('user'))
    this.isAuthenticated = true;
  }

  logout() {
    // Perform logout logic
    this.isAuthenticated = false;
  }

  Authenticated(): boolean {
    this.login() ;
    return this.isAuthenticated;
  }
}
