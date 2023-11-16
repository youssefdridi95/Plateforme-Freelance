import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-profil-entreprise',
  templateUrl: './profil-entreprise.component.html',
  styleUrls: ['./profil-entreprise.component.css']
})
export class ProfilEntrepriseComponent {
 
  // Use ViewChild to get references to the input fields
  @ViewChild('nomInput') nomInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('adresseInput') adresseInput!: ElementRef;
  @ViewChild('telephoneInput') telephoneInput!: ElementRef;
  @ViewChild('siteWebInput') siteWebInput!: ElementRef;
  @ViewChild('fondeeEnInput') fondeeEnInput!: ElementRef;
  entreprise = {
    nom : '' ,
    adresse : '' ,
    telephone : '' ,
    siteWeb : '' ,
    fondeeEn : '' ,
    email : "" ,
  }
   
  isClicked =false
  // Function to focus on the input field
  focusOn(inputName: string) {
    switch (inputName) {
      case 'nom':
        this.nomInput.nativeElement.disabled = false;
        this.nomInput.nativeElement.focus();
        break;
      case 'adresse':
        this.adresseInput.nativeElement.disabled = false;
        this.adresseInput.nativeElement.focus();
        break;
      case 'telephone':
        this.telephoneInput.nativeElement.disabled = false;
        this.telephoneInput.nativeElement.focus();
        break;
      case 'site-web':
        this.siteWebInput.nativeElement.disabled = false;
        this.siteWebInput.nativeElement.focus();
        break;
      case 'fondee-en':
        this.fondeeEnInput.nativeElement.disabled = false;
        this.fondeeEnInput.nativeElement.focus();
        break;
      default:
        // Handle invalid inputName or provide appropriate error handling
        break;
    }

    if(!this.isClicked) this.isClicked =true

  }

  updateEnt(){
    this.entreprise = {
      nom : this.nomInput.nativeElement.value ,
      adresse : this.adresseInput.nativeElement.value ,
      telephone : this.telephoneInput.nativeElement.value ,
      siteWeb : this.siteWebInput.nativeElement.value ,
      fondeeEn : this.fondeeEnInput.nativeElement.value ,
      email : this.emailInput.nativeElement.value ,
    }

    console.log(  this.entreprise)

  }

  ngOnInit (): void{
   const entreprise1 = JSON.parse( sessionStorage.getItem("user")!)
   this.entreprise.email=entreprise1.email
  }
}
