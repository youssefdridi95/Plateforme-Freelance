import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../env';
import { environments } from 'src/enviroments';

@Injectable({
  providedIn: 'root'
})
export class MotdepasseService {
  private env :Env 
  constructor(private http: HttpClient ) { 
    this.env =environments as Env
    this.url =this.env.backendUrl;
    this.requestResetPwd = this.env.requestResetPwd
    this.resetPwd  = this.env.resetPwd
  
  
    
  }
  private url 
  private  requestResetPwd 
  private  resetPwd  


  
  


  




  // function signup api call
recuperationMdp(email: string){
  return this.http.post(this.url + this.requestResetPwd,{
    "email": email
  });
}
changeMdp(reset:string ,password: string){
  return this.http.put(this.url + this.resetPwd,{
    "newPassword": password,
    "reset":reset
  });
}
}