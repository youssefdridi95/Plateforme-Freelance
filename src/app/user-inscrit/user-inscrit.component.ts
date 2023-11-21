import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { roles } from 'src/environments/environment';



interface LoginResponse {
  id: string;
  token: string;
  type: string;
  username: string;
  email: string;
  roles: string[];
  msg: string;
}


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

  userFormlogin = new FormGroup({
    username :  new FormControl('', [Validators.required,Validators.minLength(3)]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)]),
  })


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
        
        this.router.navigate(['/user/connexion/signin']);

        this.toastr.success('a été crée avec succés','compte')

      },
      err=>{
        console.log(err);

    // console.log('Formulaire soumis avec error', this.userForm.value);
    this.toastr.error(err.error.message, 'Connexion')

      }
    )

  }

  loginUser() {
    const user = {
      'username': this.userFormlogin.value.username,
      'password': this.userFormlogin.value.password,
      'role': roles.userRole    };
  
    this.userService.loginUser(user).subscribe(
    (res: any) => {
      const loginResponse: LoginResponse = res as LoginResponse;
     
      
      if (!loginResponse.roles.includes(roles.user)) {
        this.toastr.error("vous n'êtes pas un developpeur.  essayez de se connecter en tant qu'une entreprise ", 'erreur');
      } else {
        this.router.navigate(['/user/profile/create']);
        this.toastr.success('Connexion réussie', 'Compte');
        sessionStorage.setItem('user', JSON.stringify(res));
      }
    },
    err => {
      this.toastr.error(err.error.message, 'Compte');
    }
  );
  

  }
  

  constructor(private roote : ActivatedRoute,private userService: UserService ,private toastr : ToastrService, private router: Router){
    this.roote.paramMap.subscribe(params =>{this.inscrit=params.get('type')})
  }

  inscrit:any;
  // sign = true;





}
