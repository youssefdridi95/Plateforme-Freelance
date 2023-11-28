import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
constructor(private router: Router){}
shouldShowNavbar(): boolean {
  // Check if the current route is not '/login/entreprise'
  return (
   this.router.url === '/user/connexion/signin'  ||
    this.router.url === '/user/connexion/signup'  ||  
    this.router.url === '/entreprise/connexion/login'||  
    this.router.url === '/entreprise/connexion/signup'|| 
    this.router.url === '/mdp'|| 
    this.router.url === '/adduser'|| 
    this.router.url === '/role');
}
}
