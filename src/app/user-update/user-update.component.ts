import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserProfil } from '../services/user-profil';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {
  profil: any

  constructor(private roote : ActivatedRoute,private userService: UserService ,private toastr : ToastrService, private router: Router, private userProfilService: UserProfil){
   
  }
  ngOnInit() {
    // Récupérer l'utilisateur depuis la session
    const userString = sessionStorage.getItem('profil');
    this.profil = JSON.parse(sessionStorage.getItem('profil')!);

    if (userString) {
       this.profil = JSON.parse(userString);
       this.edituser = new FormGroup({
        // email: new FormControl('', [Validators.required, Validators.minLength(4)]),
        id: new FormControl(this.profil.id, [Validators.required]),

        prenom: new FormControl(this.profil.prenom, [Validators.required, Validators.minLength(4)]),
        nom: new FormControl(this.profil.nom, [Validators.required]),
        timezone: new FormControl(this.profil.timezone, [Validators.required]),
    
        //  mainSkill : new FormControl ('' , [Validators.required] )
    
      });
    }
  }

  edituser:any
edituserProfile(){
  if (this.edituser.valid) {
    const userProfil = {
      'id': this.profil.id as string,

    'nom' : this.edituser.value.nom ,
    'prenom' : this.edituser.value.prenom ,
    'timezone' : this.edituser.value.timezone ,
  }

  this.userProfilService.editProfil(userProfil).subscribe(
    res=>{
      console.log(res);
      this.toastr.success('modification avec succes')
      // sessionStorage.removeItem('profil');
      // sessionStorage.getItem('profil');

      console.log(this.profil.user);
        setTimeout(()=>{
          this.router.navigate(['/user/compte/',this.profil.user]);

        },2000)

    },
    err=>{
      console.log(err.error);
      this.toastr.error(err.error.message[0], 'erreur de modification')

  // console.log('Formulaire soumis avec error', this.userForm.value);
  // this.toastr.error(err.error.message[0], 'Connexion')

    }
  )}

}
}
