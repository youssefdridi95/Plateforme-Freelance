import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MotdepasseService {

  constructor(private http: HttpClient) { }
  private url ="http://192.168.195.26:9090";
  


  




  // function signup api call
recuperationMdp(email: string){
  return this.http.post(this.url + '/auth/sendEmail',{
    "email": email
  });
}
changeMdp(reset:string ,password: string){
  return this.http.put(this.url + '/auth/setPassword',{
    "newPassword": password,
    "reset":reset
  });
}
}