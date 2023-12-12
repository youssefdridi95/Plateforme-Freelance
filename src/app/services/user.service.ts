import { HttpClient, HttpParams } from '@angular/common/http';
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
    this.userSignup = this.env.usersSignup
    this.userSignin  = this.env.usersSignin
    this.viewNumber = this.env.viewNumber
    this.viewNumberEntreprise = this.env.viewNumberEntreprise
   }
  

   private url 
   private  userSignup 
   private  userSignin 
  private viewNumber 
private viewNumberEntreprise

  // function signup api call
signup(user: any){
  return this.http.post(this.url + this.userSignup,user);
}
loginUser(user: any){
  return this.http.post(this.url + this.userSignin, user);
}
updateViewNbr(id  : any , idVisiteur : any  ){
  
  let params = new HttpParams()
  .set('profileId', id)
  .set('idVisiteur', idVisiteur )
  // console.log(params);

 return this.http.put(this.url + this.viewNumber,{},{params});

}
updateViewNbrEntreprise(id  : any , idVisiteur : any  ){
  
  let params = new HttpParams()
  .set('profileId ', id)
  .set('idVisiteur', idVisiteur )
  // console.log(params);

 return this.http.put(this.url + this.viewNumberEntreprise,{},{params});

}


  // function signin api call
}
