// user-form.component.ts
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserProfil } from '../services/user-profil';
import * as isoCountries from 'i18n-iso-countries';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
// import { profile } from 'console';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  email: string = '';
  username: string = '';
  userId: string = '';
  totalSize: number = 0;
  isFirstLogin: boolean = true;  // Ajout de cette variable

  userProfil = new FormGroup({
    // email: new FormControl('', [Validators.required, Validators.minLength(4)]),
    prenom: new FormControl('', [Validators.required, Validators.minLength(4)]),
    nom: new FormControl('', [Validators.required]),
    timezone: new FormControl('', [Validators.required]),
     file : new FormControl ('' , [Validators.required] ),
     file2 : new FormControl (null ),
    //  mainSkill : new FormControl ('' , [Validators.required] )

  });

  constructor(private toastr: ToastrService, private userProfilService: UserProfil, private router: Router) {

  }

  ngOnInit() {
    // Récupérer l'utilisateur depuis la session
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.email = user.email;
      this.username = user.username;
      this.userId = user.id


      const isFirstLoginString = sessionStorage.getItem('isFirstLogin');
      if (isFirstLoginString) {
        this.isFirstLogin = JSON.parse(isFirstLoginString);
      }
    }
  }
  selectedFile: File | null = null;

 
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files?.[0] || null;
    console.log( this.selectedFile);
    
  }

  // ngOnInit() {
  //   // Récupérer le nom d'utilisateur et l'e-mail depuis le sessionStorage
  //   const storedUsername = sessionStorage.getItem('username');
  //   const storedEmail = sessionStorage.getItem('email'); // Changez de 'useremail' à 'email'
  
  //   // Assurez-vous que la valeur n'est pas null avant de l'assigner
  //   this.username = storedUsername ? JSON.parse(storedUsername) : '';
  //   this.email = storedEmail ? JSON.parse(storedEmail) : '';
  // }


  userProfiladd() {
    console.log(this.userId);
    
    if (this.userProfil.valid) {
      const userProfil = {
        'userId': this.userId as string,

        'prenom': this.userProfil.value.prenom,
        'nom': this.userProfil.value.nom,
        'timezone': this.userProfil.value.timezone,
        // 'file': this.userProfil.value.file,

        // 'mainSkill': this.userProfil.value.mainSkill,

      
      };
      if( userProfil.userId && userProfil.prenom && userProfil.nom  && userProfil.timezone  &&  this.selectedFile)
{
 let params = new HttpParams()
  .set('prenom', userProfil.prenom)
  .set('nom', userProfil.nom)
  .set('timezone', userProfil.timezone)
  .set('userId', userProfil.userId);


      const formData = new FormData();
  // {  formData.append('userId', userProfil.userId);

  //   {  formData.append('Prenom', userProfil.prenom);
  //     formData.append('nom', userProfil.nom);
  //     formData.append('tel', userProfil.tel);
  //     formData.append('timezone', userProfil.timezone);
      formData.append('file', this.selectedFile);
      // formData.append('mainSkill', userProfil.mainSkill);

  


      this.userProfilService.userProfiladd(formData,params).subscribe(
        res => {
          console.log('reussite',res);
          this.toastr.success('reussite')
              sessionStorage.setItem('profile' , JSON.stringify(res));
              this.router.navigate(['/cv/creer']);

          // Ajoutez ici d'autres actions en cas de succès
        },
        err => {
          console.log('failed',err);
          this.toastr.error(err.error.message,'failed')

          // Ajoutez ici d'autres actions en cas d'erreur, comme l'affichage d'un message d'erreur avec Toastr
          // this.toastr.error(err.error.message, 'Connexion');

        }
      );  }
    }
  }
  
  }

