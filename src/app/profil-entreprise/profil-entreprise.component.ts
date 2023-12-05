import { Component} from '@angular/core';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EntrepriseService } from '../services/entreprise.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-profil-entreprise',
  templateUrl: './profil-entreprise.component.html',
  styleUrls: ['./profil-entreprise.component.css']
})
export class ProfilEntrepriseComponent {
  // posts: any;
  arrowUp: boolean = false;
  entreprise:any;
  posts: any;

  emailpro = JSON.parse(sessionStorage.getItem('user')!).email;
  role = JSON.parse(sessionStorage.getItem('user')!).roles[0];
  nom = JSON.parse(sessionStorage.getItem('profil')!).profileHeadline;

  idEntreprise :any 
  constructor(
    private enterpriseService: EntrepriseService,
    private route: ActivatedRoute,
    private toastr: ToastrService,private router: Router, private postService: PostService) {
      this.route.params.subscribe(params => {
        this.idEntreprise = params['id'];
        this.getPost(this.idEntreprise);

      this.getEntrepriseById( this.idEntreprise)
      const storedUsername = sessionStorage.getItem('user');

      });
      const storedUsername = sessionStorage.getItem('user');

    }
  
  ngOnInit (): void{
    console.log(this.entreprise);


}

  // ... autres méthodes

  navigateToCvCreer(link: String) {
    
    this.router.navigate([link]);

  }
  username: string = '';
  email: string = '';
  getEntrepriseById(idEntreprise: string) {
    this.enterpriseService.getEntrepriseByid(idEntreprise).subscribe(
      (data: any) => {
          this.entreprise = data; 
        
 // Assuming the API returns an array of users
      },
      error => {
        console.error('Erreur lors de la récupération des entreprises:', error);
      }
    );
  }
  getPost(userId: any) {
    this.postService.getUserPosts(userId).subscribe(
      res => {
        this.posts = res;
        console.log('reussite affichage des publications', res);
     
        sessionStorage.setItem('posts', JSON.stringify(res))

      },
      err => {
        console.log('failed to get posts', err);
        this.toastr.error('erreur affichage publication')

        // Vérifiez si err.error et err.error.message existent avant d'y accéder

      }
    );
  }
  deletePost(postId: string) {
    if (confirm('Es-tu sur de vouloir supprimer cette publication?')) {
      console.log(postId);
      
      this.postService.delete(postId).subscribe(
        (res) => {
          console.log(res);
          location.reload();

          this.toastr.success('Publication supprimé avec succès', 'Success');
          // After deleting the post, refresh the posts list
        },
        (err) => {
          console.log(err);
          this.toastr.error('Erreur lors de la suppression de la publication', 'Error');
        }
      );
    }
  }
}