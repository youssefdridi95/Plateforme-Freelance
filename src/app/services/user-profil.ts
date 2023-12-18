import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../env';
import { environments } from 'src/enviroments';

@Injectable({
  providedIn: 'root'
})
export class UserProfil {

  private env :Env 
  id: string | undefined;

  constructor(private http: HttpClient) {
    this.env =environments as Env

    this.url =this.env.backendUrl;
    this.userCreateProfil = this.env.userCreateProfil
    this.getUserProfil = this.env.getUserProfil
     this.editUser = this.env.editUserProfil
     this.updatepssword = this.env.updatepassword
     this.getUserSkill = this.env.getUserSkill
   }
  

   private url 
   private  userCreateProfil 
   private getUserProfil
   private getUserSkill 
// function userProfiladd  api call 
   private editUser
   private updatepssword
   userProfiladd(formdata: any,params:any){
  //  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + this.userCreateProfil,formdata,{params});
  }

  getProfil(params: any){
    return this.http.get(this.url + this.getUserProfil,{params});
  }
  getStaus(id: any){
    const params = new HttpParams()
     .set('id' ,id)
    return this.http.get(this.url + this.env.status,{params});
  }
  editProfil(data: any){
    return this.http.put(this.url + this.editUser,data);
  }
  editpassword(params: any){
    return this.http.put(this.url + this.updatepssword,{},{params});
  }
  
  getUserBySkill(params: any){
    return this.http.get(this.url + this.getUserSkill,{params});
  }
  
}
