import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-inscrit',
  templateUrl: './user-inscrit.component.html',
  styleUrls: ['./user-inscrit.component.css']
})
export class UserInscritComponent {
  // public login : ;
  // confirmpass: any;
  // constructor(){
  //   this.login = new LoginModel();
  // }

  userForm = new FormGroup({


    email :  new FormControl('', [Validators.required,Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmpassword : new FormControl('',[Validators.required])
  },
  {
    validators: this.passwordMatchValidator, // Utilisez 'validators' au lieu de 'Validators'
  });
  passwordMatchValidator(control: AbstractControl) {
    return control.get('password')?.value === control.get('confirmpassword')?.value
      ? null
      : { mismatch: true };
  }

  loginUser() {
    // Vous pouvez ajouter ici le code pour traiter la soumission du formulaire
    console.log('Formulaire soumis avec succès', this.userForm.value);
  }

  constructor(private router : Router){}

  inscrit=true;
  // sign = true;


}
