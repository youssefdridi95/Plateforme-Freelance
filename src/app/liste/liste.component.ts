import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent {
  isClicked =false

  userForm !:FormGroup
  constructor(private formBuilder:FormBuilder) {  }

  ngOnInit (): void{
  this.userForm= this.formBuilder.group({
    nom:['',[Validators.minLength(3),Validators.required]],
    email:['',[Validators.minLength(3),Validators.required]],
    role:['',[Validators.minLength(3),Validators.required]],
   },

  )
  }

  add_employe(){
  console.log('here into userform, this.userForm.value)')
  }
 


  @ViewChild('nomInput') nomInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('roleInput') roleInput!: ElementRef;
 
 user = {
    nom : '' ,
    email : '' ,
    role : '' ,
  }
   
  
  
  focusOn(inputnom: string) {
    switch (inputnom) {
      case 'nom':
        this.nomInput.nativeElement.disabled = true;
        this.nomInput.nativeElement.focus();
        break;
      case 'email':
        this.emailInput.nativeElement.disabled = true;
        this.emailInput.nativeElement.focus();
        break;
      case 'role':
        this.roleInput.nativeElement.disabled = true;
        this.roleInput.nativeElement.focus();
        break;
    }

    if(!this.isClicked) this.isClicked =false

  }





}