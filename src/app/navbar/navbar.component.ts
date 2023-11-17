import { Component } from '@angular/core';
import { WidthCheckService } from '../services/width-check.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private widhtChecker :WidthCheckService,private router: Router ){
  }
    logoUrl="background-image:url('./../../assets/logo.png');"

    isMenuOpen=false
  
    
    navItemsDisplay=this.widhtChecker.width < 700 ? "none" : "flex"
    showNavItems(){
    
      this.isMenuOpen=!this.isMenuOpen
      this.navItemsDisplay=this.isMenuOpen ? "flex" : "none"
    }

    shouldShowNavbar(): boolean {
      // Check if the current route is not '/login/entreprise'
      return (
        this.router.url === '/user/connexion/signin'  ||
         this.router.url === '/user/connexion/signup'  ||  
         this.router.url === '/entreprise/connexion/login'||  
         this.router.url === '/entreprise/connexion/signup'|| 
         this.router.url === '/mdp'|| 
         this.router.url === '/');
     }    
}
