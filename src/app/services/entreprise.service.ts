import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable ,throwError} from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const AUTH_TOKEN = 'user';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  router: any;
   
  constructor(private http: HttpClient) { }
  private url =environment.backendUrl;
  private  userSignup = environment.usersSignup
  private  userSignin  = environment.usersSignin


  

  
signup(entreprise: any){
  return this.http.post(this.url  + this.userSignup,entreprise);
}
login(entreprise: any){
  return this.http.post(this.url + this.userSignin,entreprise);
}



}
