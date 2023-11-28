import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../env';
import { environments } from 'src/enviroments';

@Injectable({
  providedIn: 'root'
})
export class UserProfil {

  private env :Env 

  constructor(private http: HttpClient) {
    this.env =environments as Env

    this.url =this.env.backendUrl;
    this.userCreateProfil = this.env.userCreateProfil
    this.getUserProfil = this.env.getUserProfil
   }
  

   private url 
   private  userCreateProfil 
   private getUserProfil
// function userProfiladd  api call 
   userProfiladd(formdata: any,params:any){
  //  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + this.userCreateProfil,formdata,{params});
  }

  getProfil(params: any){
    return this.http.get(this.url + this.getUserProfil,{params});
  }
  
  

}
