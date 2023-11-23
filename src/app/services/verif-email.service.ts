import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../env';
import { environments } from 'src/enviroments';

@Injectable({
  providedIn: 'root'
})
export class VerifEmailService {

  private env :Env 

  constructor(private http: HttpClient) {
    this.env =environments as Env

    this.url =this.env.backendUrl;
    this.verifcompte = this.env.verifcompte
    this.regenerateOtp  = this.env.regenerateOtp
   }
  

   private url 
   private  verifcompte 
   private  regenerateOtp 




  // function signup api call
verif(compte: any){
  return this.http.put(this.url + this.verifcompte,compte);
}
regenerateOtpCode(email : any){
  return this.http.put(this.url + this.regenerateOtp, {"email":email});
}

}
