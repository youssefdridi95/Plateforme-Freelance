import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserProfil } from '../services/user-profil';

@Component({
  selector: 'app-user-compte',
  templateUrl: './user-compte.component.html',
  styleUrls: ['./user-compte.component.css']
})

export class UserCompteComponent {

  constructor(private toastr: ToastrService, private userProfilService: UserProfil,private router: Router) {
  }

  navigateToCvCreer(link: String) {
    
    this.router.navigate([link]);

  }
  username: string = '';
  email: string = '';
  userId = '';
  ngOnInit() {
    // Récupérer le nom d'utilisateur et l'e-mail depuis le sessionStorage
    const storedUsername = sessionStorage.getItem('username');
    const storedEmail = sessionStorage.getItem('email'); // Changez de 'useremail' à 'email'
  
    // Assurez-vous que la valeur n'est pas null avant de l'assigner
    this.username = storedUsername ? JSON.parse(storedUsername) : '';
    this.email = storedEmail ? JSON.parse(storedEmail) : '';
  }
  getProfil(){
    let params = new HttpParams()

  .set('userId', JSON.parse(sessionStorage.getItem('user')!).id);



  


      this.userProfilService.getProfil(params).subscribe(
        res => {
          console.log('reussite',res);
          this.toastr.success('reussite')
          sessionStorage.setItem('profil', JSON.stringify(res));

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
