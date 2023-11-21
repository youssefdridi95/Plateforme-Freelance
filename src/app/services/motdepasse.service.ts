import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MotdepasseService {

  constructor(private http: HttpClient) { }
  private url =environment.backendUrl;
  private  requestResetPwd = environment.requestResetPwd
  private  resetPwd  = environment.resetPwd


  
  


  




  // function signup api call
recuperationMdp(email: string){
  return this.http.post(this.url + this.resetPwd,{
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