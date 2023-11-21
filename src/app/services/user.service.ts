import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private url =environment.backendUrl;
  private  usersSignup = environment.usersSignup
  private  usersSignin  = environment.usersSignin


  




  // function signup api call
signup(user: any){
  return this.http.post(this.url + this.usersSignup,user);
}
loginUser(user: any){
  return this.http.post(this.url + this.usersSignin, user);
}


  // function signin api call
}
