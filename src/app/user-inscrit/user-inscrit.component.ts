import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Env } from '../env';
import { environments } from 'src/enviroments';



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
      'role' : this.env.roles.userRole ,
    }

    this.userService.signup(user).subscribe(
      res=>{
        console.log(res);
        
        this.router.navigate(['/verif/email/'+user.role+'/'+user.email]);
        
        this.toastr.success('a été crée avec succés ,merci de verifier votre email pour l\'activer' ,'compte')

      },
      err=>{
        console.log(err.error);

    // console.log('Formulaire soumis avec error', this.userForm.value);
    this.toastr.error(err.error.message[0], 'Connexion')

      }
    )

  }
  ngOnInit() {
    // Vérifie si l'utilisateur est déjà connecté
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      // Redirige vers la page user/compte si déjà connecté
      this.router.navigate(['/user/compte']);
    }
  }

  loginUser() {
    const user = {
      'username': this.userFormlogin.value.username,
      'password': this.userFormlogin.value.password,
    };
  
    this.userService.loginUser(user).subscribe(
      (res: any) => {
        const loginResponse: LoginResponse = res as LoginResponse;
  
        if (!loginResponse.roles.includes(this.env.roles.user)) {
          this.toastr.error("vous n'êtes pas un développeur. Essayez de vous connecter en tant qu'une entreprise", 'erreur');
        } else {
          // Redirige vers la page appropriée en fonction de la première connexion
          const isFirstLogin = sessionStorage.getItem('isFirstLogin') !== 'false';
          if (isFirstLogin) {
            this.router.navigate(['/user/profile/create']);
            sessionStorage.setItem('isFirstLogin', 'false');  // Ajoutez cette ligne
          } else {
            this.router.navigate(['/user/compte']);
          }
  
          this.toastr.success('Connexion réussie', 'Compte');
          sessionStorage.setItem('user', JSON.stringify(res));
          sessionStorage.setItem('email', JSON.stringify(loginResponse.email));
          sessionStorage.setItem('username', JSON.stringify(loginResponse.username));
        }
      },
      err => {
        this.toastr.error(err.error.message, 'Compte');
      }
    );
  }
  
  
  private env : Env

  constructor(private roote : ActivatedRoute,private userService: UserService ,private toastr : ToastrService, private router: Router){
    this.roote.paramMap.subscribe(params =>{this.inscrit=params.get('type')})
    this.env = environments as Env 
  }

  inscrit:any;
  // sign = true;





}
