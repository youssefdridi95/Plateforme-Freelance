import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AddPostComponent } from '../add-post/add-post.component';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-user-compte',
  templateUrl: './user-compte.component.html',
  styleUrls: ['./user-compte.component.css']
})

export class UserCompteComponent {

  constructor(private router: Router, private sharedService: SharedService) {}

  navigateToCvCreer(link: String) {
    
    this.router.navigate([link]);

  }
  username: string = '';
  email: string = '';
  post = false;
  ngOnInit() {

    // Récupérer le nom d'utilisateur et l'e-mail depuis le sessionStorage
    const storedUsername = sessionStorage.getItem('username');
    const storedEmail = sessionStorage.getItem('useremail');
  
    // Assurez-vous que la valeur n'est pas null avant de l'assigner
    this.username = storedUsername ?JSON.parse (storedUsername) : '';
    this.email = storedEmail ? JSON.parse (storedEmail) : '';
  }
}
