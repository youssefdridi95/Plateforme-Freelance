import { Component} from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-entreprise',
  templateUrl: './profil-entreprise.component.html',
  styleUrls: ['./profil-entreprise.component.css']
})
export class ProfilEntrepriseComponent {
  post = false;


  constructor(private router: Router, private sharedService: SharedService) {}
  arrowUp: boolean = false;

  // ... autres méthodes

  toggleArrow() {
    this.arrowUp = !this.arrowUp;
    this.post=!this.post
  }

  navigateToCvCreer(link: String) {
    
    this.router.navigate([link]);

  }
  username: string = '';
  email: string = '';
  ngOnInit() {

    // Récupérer le nom d'utilisateur et l'e-mail depuis le sessionStorage
    const storedUsername = sessionStorage.getItem('username');
    const storedEmail = sessionStorage.getItem('useremail');
  
    // Assurez-vous que la valeur n'est pas null avant de l'assigner
    this.username = storedUsername ?JSON.parse (storedUsername) : '';
    this.email = storedEmail ? JSON.parse (storedEmail) : '';
  } }