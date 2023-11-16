import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private url ="http://192.168.195.26:9090";
  


  




  // function signup api call
signup(user: any){
  return this.http.post(this.url + '/auth/signup', user);
}
loginUser(user: any){
  return this.http.post(this.url + '/auth/signin', user);
}


  // function signin api call
}
