import { Component, ElementRef, HostListener } from '@angular/core';
import { WidthCheckService } from '../services/width-check.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private widhtChecker :WidthCheckService,private router: Router ,private elementRef: ElementRef ){
        this.widhtChecker.width=this.checkScreenWidth()
        this.navItemsDisplay=this.widhtChecker.width < 900 ? "none" : "flex"

  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.widhtChecker.width = this.checkScreenWidth();
    this.navItemsDisplay=this.widhtChecker.width < 900 ? "none" : "flex"
  }
  checkScreenWidth() {
    const screenWidth = this.elementRef.nativeElement.ownerDocument.defaultView.innerWidth;
   return screenWidth
    // You can perform any logic based on the screen width here
  }

    logoUrl="background-image:url('./../../assets/logo.png');"

    isMenuOpen=false
  
    
    navItemsDisplay:any
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
         this.router.url === '/role');
     }   
     
     
     showBtn (): boolean {
      // Check if the current route is not '/login/entreprise'
      return this.router.url === '/'  
       
     }   
     isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
