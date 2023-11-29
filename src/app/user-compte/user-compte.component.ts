import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserProfil } from '../services/user-profil';
import { map, catchError, of } from 'rxjs';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-user-compte',
  templateUrl: './user-compte.component.html',
  styleUrls: ['./user-compte.component.css']
})

export class UserCompteComponent {

  constructor(private toastr: ToastrService, private userProfilService: UserProfil,private router: Router, private roote: ActivatedRoute, private postService : PostService) {
    this.roote.paramMap.subscribe(params =>{this.userId=params.get('id')})

  }

  navigateToCvCreer(link: String) {
    
    this.router.navigate([link]);

  }
  username: string = '';
  email: string = '';
  userId : any;
  profil : any;
  ngOnInit() {
    // Récupérer le nom d'utilisateur et l'e-mail depuis le sessionStorage
    const storedUsername = sessionStorage.getItem('username');
    const storedEmail = sessionStorage.getItem('email'); // Changez de 'useremail' à 'email'
  
    // Assurez-vous que la valeur n'est pas null avant de l'assigner
    this.username =   JSON.parse(sessionStorage.getItem('user')!).username

    this.email =   JSON.parse(sessionStorage.getItem('user')!).email


this.getProfil();
this.getPost(this.userId); 
  }
  getProfil(){
    let params = new HttpParams()

  .set('userId', this.userId);


      this.userProfilService.getProfil(params).subscribe(
        res => {
          console.log('reussite',res);
          this.toastr.success('reussite')
        if(this.userId== JSON.parse(sessionStorage.getItem('user')!).id){
          this.profil= JSON.parse(sessionStorage.getItem('profil')!)
        }
else{
  this.profil=res;
}
          // Ajoutez ici d'autres actions en cas de succès
        },
        err => {
          console.log('failed',err);
          this.toastr.error(err.error.message,'failed')

          // Ajoutez ici d'autres actions en cas d'erreur, comme l'affichage d'un message d'erreur avec Toastr
          // this.toastr.error(err.error.message, 'Connexion');

        }
      );  }
      getPost(userId: any) {
        this.postService.getUserPosts(userId).subscribe(
          res => {
            console.log('reussite des posts', res);
            // Faites quelque chose avec les posts récupérés, par exemple, assignez-les à une variable de composant
            // this.posts = res;
          },
          err => {
            console.log('failed to get posts', err);
      
            // Vérifiez si err.error et err.error.message existent avant d'y accéder
      
          }
        );
      }
      
      
      
    }
   