import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable ,throwError} from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { Env } from '../env';
import { environments } from 'src/env.iroments';
const AUTH_TOKEN = 'user';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  router: any;
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


  

  
signup(entreprise: any){
  return this.http.post(this.url  + this.userSignup,entreprise);
}
login(entreprise: any){
  return this.http.post(this.url + this.userSignin,entreprise);
}



}
