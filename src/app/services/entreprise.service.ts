import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const TOKEN_KEY = 'myAuthTokenKey';
const entreprise_KEY = 'myUserKey';
@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  constructor(private http: HttpClient) { }
  private url ="http://192.168.195.26:9090";
  


  




  // function signup api call
signup(entreprise: any){
  return this.http.post(this.url + '/auth/signup',entreprise);
}
login(entreprise: any){
  return this.http.post(this.url + '/auth/signin',entreprise);
}

}
