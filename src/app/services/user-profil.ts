import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../env';
import { environments } from 'src/enviroments';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private env :Env 

  constructor(private http: HttpClient) {
    this.env =environments as Env

    this.url =this.env.backendUrl;
    this.userProfil = this.env.usersSignup
   }
  

   private url 
   private  userProfil 

// function userProfiladd  api call 
userProfiladd(user: any){
    return this.http.post(this.url + this.userProfil,user);
  }


}
