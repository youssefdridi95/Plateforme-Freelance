import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable ,throwError} from 'rxjs';
import { catchError,map } from 'rxjs/operators';
const AUTH_TOKEN = 'user';

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



}
