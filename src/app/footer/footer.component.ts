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
  return (this.router.url === '/login/entreprise' ||  this.router.url === '/user/connexion'  ||  this.router.url === '/creation/entreprise'||  this.router.url === '/role');
}
}
