import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

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


    username :  new FormControl('', [Validators.required,Validators.minLength(4)]),
    email :  new FormControl('', [Validators.required,Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)]),
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


  signupUser() {
    const user= {
      'username' : this.userForm.value.username ,
      'email' : this.userForm.value.email ,
      'password' : this.userForm.value.password ,
      'role' : 'DEV' ,
    }

    this.userService.signup(user).subscribe(
      res=>{
        console.log(res);
        
        this.toastr.success('a été crée avec succés','compte')

      },
      err=>{
        console.log(err);

    this.toastr.error('error','compte')

      }
    )

  }

  loginUser() {
    // Vous pouvez ajouter ici le code pour traiter la soumission du formulaire
    console.log('Formulaire soumis avec succès', this.userForm.value);
  }

  constructor(private roote : ActivatedRoute,private userService: UserService ,private toastr : ToastrService){
    this.roote.paramMap.subscribe(params =>{this.inscrit=params.get('type')})
  }

  inscrit:any;
  // sign = true;





}
