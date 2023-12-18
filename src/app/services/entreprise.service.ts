import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable ,throwError} from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { Env } from '../env';
import { environments } from 'src/enviroments';
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
    this.addemploye = this.env.addmploye
    this.addemp = this.env.addemp
    this.employer = this.env.employer
    this.entreprise = this.env.entreprise
    this.profilEntreprise = this.env.profilEntreprise
    this.delete = this.env.delete
    this.update = this.env.update
    this.deleteCompte = this.env.deleteCompte
   }
   private url 
   private  userSignup 
   private  userSignin 
   private  addemploye 
   private addemp
   private employer
   private entreprise
   private profilEntreprise
   private delete
  private update
  private deleteCompte
  
signup(entreprise: any){
  return this.http.post(this.url  + this.userSignup,entreprise);
}
login(entreprise: any){
  return this.http.post(this.url + this.userSignin,entreprise);
}


addUser(data: any){
  return this.http.post(this.url + this.addemploye,data);
}
add(data: any){
  return this.http.post(this.url + this.addemp,data);
}
getByEntreprise(id: any){   
  let params = new HttpParams();
  params = params.append('id', id);
  return this.http.get(this.url + this.employer,{params});
}

creationEntreprise(data: any,params:any){
 
  return this.http.post(this.url + this.entreprise,data,{params});
}
getEntrepriseByid(id: any){
  let params = new HttpParams();
params = params.append('userId', id);
  return this.http.get(this.url + this.profilEntreprise,{params});
}
deleteUser(userId: string): Observable<any> {
  let params = new HttpParams();
  params = params.append('id', userId);
  return this.http.delete(this.url+this.delete,{params});
}
updateEntreprise(data:any) {
  console.log(data);
  
  return this.http.put(this.url + this.update,data);
}
deletecompte(userId:any) {
  console.log(userId);
  let params = new HttpParams();
  params = params.append('id', userId);
  return this.http.post(this.url + this.deleteCompte,{},{params});
}

getStaus(id: any){
  const params = new HttpParams()
   .set('id' ,id)
  return this.http.get(this.url + this.env.status,{params});
}
}
