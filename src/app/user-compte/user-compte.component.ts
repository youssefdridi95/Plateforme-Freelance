import { Component } from '@angular/core';

@Component({
  selector: 'app-user-compte',
  templateUrl: './user-compte.component.html',
  styleUrls: ['./user-compte.component.css']
})
export class UserCompteComponent {


  username: string = '';
  email: string = '';

  ngOnInit() {
    // Récupérer le nom d'utilisateur et l'e-mail depuis le sessionStorage
    const storedUsername = sessionStorage.getItem('username');
    const storedEmail = sessionStorage.getItem('useremail');
  
    // Assurez-vous que la valeur n'est pas null avant de l'assigner
    this.username = storedUsername ?JSON.parse (storedUsername) : '';
    this.email = storedEmail ? JSON.parse (storedEmail) : '';
  }
}