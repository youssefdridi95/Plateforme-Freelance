import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserProfil } from '../services/user-profil';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  email: string = '';
  userProfil = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    lastName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),

    // Ajoutez d'autres champs ici
  });
  constructor(private toastr: ToastrService, private userProfilService: UserProfil) {}

  ngOnInit() {
    // Récupérer l'utilisateur depuis la session
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.email = user.email;
    }
    
  }

  userProfiladd() {
    const userProfil = {
      'nom': this.userProfil.value.firstName,
      'lastName': this.userProfil.value.lastName,
      'phoneNumber': this.userProfil.value.phoneNumber,
      'address': this.userProfil.value.address,
    };
    
    
    this.userProfilService.userProfiladd(userProfil).subscribe(
      res => {
        console.log(res);
        // Ajoutez ici d'autres actions en cas de succès
      },
      err => {
        console.log(err);
        // Ajoutez ici d'autres actions en cas d'erreur, comme l'affichage d'un message d'erreur avec Toastr
        this.toastr.error(err.error.message, 'Connexion');
      }
    );
  }
}
