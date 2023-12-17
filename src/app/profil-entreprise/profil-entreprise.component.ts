import { Component} from '@angular/core';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EntrepriseService } from '../services/entreprise.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { ChatsService } from '../services/chats.service';

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
  profil: any;
pub = true ;
profilImage :any
  post = {
    date: '2023-12-06T12:42:31.039', // Mettez votre date ici
    // Autres propriétés du post
  };
  emailpro = JSON.parse(sessionStorage.getItem('user')!).email;
  role = JSON.parse(sessionStorage.getItem('user')!).roles[0];
  nom = JSON.parse(sessionStorage.getItem('profil')!).profileHeadline;

  idEntreprise :any 
  constructor(
    private enterpriseService: EntrepriseService,
    private route: ActivatedRoute,
    private toastr: ToastrService,private router: Router, private postService: PostService,
     private userService: UserService,
     private chatService :ChatsService) {
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
formatDate(dateString: string): string {
  const parts = dateString.split('T')[0].split('-');
  const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
  return formattedDate;
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
        if (idEntreprise == JSON.parse(sessionStorage.getItem('user')!).id ||
          idEntreprise == JSON.parse(sessionStorage.getItem('user')!).idEntreprise ) {
          sessionStorage.setItem('profil', JSON.stringify(data));
          this.profil = data; // Ajoutez cette ligne pour initialiser this.profil
          this.postService.getFile( data.file.fileDownloadUri).subscribe(

            (fileBlob: Blob) => {
  
            console.log(fileBlob.type);
            this.profilImage = URL.createObjectURL(fileBlob)// Assurez-vous que le champ est correct
            
          
            },
  
          );
          this.updateViewNmbrEntreprise();
        }
      },
      error => {
        console.error('Erreur lors de la récupération des entreprises:', error);
      }
    );
  }
  
  getPost(userId: any) {
    this.postService.getUserPosts(userId).subscribe(
      (res : any ) => {
        this.posts = res;
        console.log('reussite affichage des publications', res);
        res['filesURLS']=[]
        for(let post of res.content)
      {  

        let filesURLS:any[]=[]
        for (let file of post.files) {
       
          this.postService.getFile( file.fileDownloadUri).subscribe(

          (fileBlob: Blob) => {

          console.log(fileBlob.type);
          
            filesURLS.push( {
              url :URL.createObjectURL(fileBlob) ,
              type : fileBlob.type.split('/')[0],
              original : fileBlob.type
            });
          },
          (error :any) => {
            // Handle errors
            filesURLS.push('image');
            // console.error('Error downloading file:', error);
          }
        );
                 
          
      }
      post['filesURLS']=filesURLS
       }

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
  updateViewNmbrEntreprise() {
    console.log('Avant la fonction ddedd');

    const storedProfileId = sessionStorage.getItem('lastViewedProfileId');
    if (storedProfileId !== this.profil.id) {
      this.userService.updateViewNbrEntreprise(this.profil.id as string, JSON.parse(sessionStorage.getItem('profil')!).id).subscribe(
        (res) => {
          console.log('modification avec succès entreprise', res);
          // this.toastr.success('Modification avec succès');
          sessionStorage.setItem('lastViewedProfileId', this.profil.id as string);
        },
        (err) => {
          console.log('échec de la modification', err);
          // this.toastr.error('Erreur de modification', 'Erreur');
        }
      );
    }
  }

  addOrGOToChat(){
    let  id=JSON.parse(sessionStorage.getItem('user')!).id

      if(JSON.parse(sessionStorage.getItem('user')!).roles.at(0)=='ROLE_RECRUTER')
      id=JSON.parse(sessionStorage.getItem('user')!).idEntreprise
    console.log('connected',id);
    console.log('visited',this.idEntreprise);
    
    
      this.chatService.addChat(this.idEntreprise,id).subscribe(
        (res:any)=>{
          console.log(res);
          this.router.navigate(['/id',res.chatId])
        },
        (err)=>{
          console.log(err);
        },
      )
    }
}