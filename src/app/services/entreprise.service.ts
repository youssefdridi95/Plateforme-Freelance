import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable ,throwError} from 'rxjs';
import { catchError,map } from 'rxjs/operators';
const AUTH_TOKEN = 'user';
const entreprise_KEY = 'myUserKey';
@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  router: any;
   
  constructor(private http: HttpClient) { }
  private url ="http://192.168.195.26:9090";
  
signup(entreprise: any){
  return this.http.post(this.url + '/auth/signup',entreprise);
}
login(entreprise: any){
  return this.http.post(this.url + '/auth/signin',entreprise);
}
saveUserDate(token: string,entreprise: any) {
  sessionStorage.setItem(AUTH_TOKEN, token);
  sessionStorage.setItem(entreprise_KEY, JSON.stringify(entreprise));
}
isLoggedIn() :boolean {
  //just for check token exist
   return !!sessionStorage.getItem(AUTH_TOKEN);
 }
 logOut() {
  sessionStorage.removeItem(AUTH_TOKEN);
  sessionStorage.removeItem(entreprise_KEY);
  this.router.navigateByUrl('/entreprise/connexion/login')
}

}
