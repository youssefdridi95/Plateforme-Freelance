import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  ngOnInit() {
    // Récupérer l'utilisateur depuis la session
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.email = user.email;
    }
  }

  userProfiladd() {
    const userProfil={
      'nom   ' : this.userProfil.value.firstName,
      'lastName' : this.userProfil.value.lastName,
      'phoneNumber' : this.userProfil.value.phoneNumber,
      'adress' :  this.userProfil.value.address,

    }
    // Ajoutez votre logique de traitement ici
    console.log('Formulaire soumis avec succès', this.userProfil.value);
  }
}
