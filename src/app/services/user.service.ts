import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../env';
import { environments } from 'src/env.iroments';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private env :Env 

  constructor(private http: HttpClient) {
    this.env =environments as Env

    this.url =this.env.backendUrl;
    this.userSignup = this.env.usersSignup
    this.userSignin  = this.env.usersSignin
   }
  

   private url 
   private  userSignup 
   private  userSignin 




  // function signup api call
signup(user: any){
  return this.http.post(this.url + this.userSignup,user);
}
loginUser(user: any){
  return this.http.post(this.url + this.userSignin, user);
}


  // function signin api call
}
