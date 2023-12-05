import { Component, ElementRef, HostListener } from '@angular/core';
import { WidthCheckService } from '../services/width-check.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
isTalent = 'both'
  constructor(private widhtChecker :WidthCheckService,private router: Router ,private elementRef: ElementRef ,private auth:AuthService){
        this.widhtChecker.width=this.checkScreenWidth()
        this.navItemsDisplay=this.widhtChecker.width < 900 ? "none" : "flex"
if (JSON.parse(sessionStorage.getItem('user')!))
    if (JSON.parse(sessionStorage.getItem('user')!).roles[0]==='ROLE_TALENT')
    this.isTalent='talent'
    else 
    this.isTalent='ent'
else
this.isTalent='both'

  }
  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      // Click occurred outside the dropdown, close it
      this.isDropdownOpen = false;
    }
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
    this.router.url === '/access/denied/404'|| 
    this.router.url === '/mdp'|| 
         this.router.url === '/mdp'||
         this.router.url === '/CreerCompteEmployee/:email/:idEntreprise/:role'|| 

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

logout(){
this.auth.logout() ;
this.router.navigate(['/'])

}



navigateToProfil(){
  if(JSON.parse(sessionStorage.getItem('user')!).roles[0]==='ROLE_TALENT')
         this.router.navigate(['/user/compte',JSON.parse(sessionStorage.getItem('user')!).id])
        else
        this.router.navigate(['/entreprise/profil',JSON.parse(sessionStorage.getItem('user')!).id])

}



}
