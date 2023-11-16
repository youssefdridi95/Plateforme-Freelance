import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
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
      'role': 'DEV',
    };
  
    this.userService.loginUser(user).subscribe(
      (res: any) => {
        console.log(res);
  
        // Assurez-vous que la réponse contient la propriété 'token'
        if (res && res.token) {
          // Stockez les informations de l'utilisateur dans sessionStorage
          sessionStorage.setItem('userToken', res.token);
          sessionStorage.setItem('userId', res.id);
          sessionStorage.setItem('userRoles', JSON.stringify(res.roles));
          sessionStorage.setItem('useremail', JSON.stringify(res.email));
          sessionStorage.setItem('username', JSON.stringify(res.username));

          this.router.navigate(['/user/form']);

          this.toastr.success('Connexion réussie', 'Connexion');
                //  this.router.navigate(['/profil']);

        } else {
          this.toastr.error('Réponse invalide du serveur', 'Connexion');
        }
      },
      err => {
        console.log(err.error);
        this.toastr.error(err.error.message, 'Connexion');
      }
    );
  
    // Vous pouvez ajouter ici le code pour traiter la soumission du formulaire
    console.log('Formulaire soumis avec succès', this.userFormlogin.value);
  }
  

  constructor(private roote : ActivatedRoute,private userService: UserService ,private toastr : ToastrService, private router: Router){
    this.roote.paramMap.subscribe(params =>{this.inscrit=params.get('type')})
  }

  inscrit:any;
  // sign = true;





}
