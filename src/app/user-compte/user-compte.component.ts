import { ChangeDetectorRef, Component, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserProfil } from '../services/user-profil';
import { map, catchError, of, Observable } from 'rxjs';
import { PostService } from '../services/post.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../services/user.service';
import { ChatsService } from '../services/chats.service';
import { SharedService } from '../shared.service';
import { environments } from 'src/enviroments';
import { Env } from '../env';

@Component({
  selector: 'app-user-compte',
  templateUrl: './user-compte.component.html',
  styleUrls: ['./user-compte.component.css']
})

export class UserCompteComponent {

status :any
env = environments as Env
  constructor(private toastr: ToastrService, private userProfilService: UserProfil, 
    private router: Router, private roote: ActivatedRoute, private postService: PostService, private cdRef: ChangeDetectorRef,
    private userService: UserService, private sharedService: SharedService,private chatService :ChatsService) {
   
    this.roote.paramMap.subscribe(params => {
      this.userId = params.get('id')
      this.getProfil();
      this.getPost(this.userId);
      // console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', this.profil);

    })
  }

  navigateToCvCreer(link: String) {

    this.router.navigate([link]);

  }
  pub = true;
  username: string = '';
  email: string = '';
  userId: any;
  profil: any;
  posts: any;
  profilImage: string = '';  // Ajoutez cette ligne dans votre classe
  test: any;
  isMine = false
   totalReactionsCount = 0;
  user : any
  // user-compte.component.ts
  userImage: string = '';  // Ajoutez cette ligne dans votre classe
img :any 
  // Dans la méthode ngOnInit
  ngOnInit() {
    const userString = sessionStorage.getItem('user');

    if (userString) {
      // Parsez la chaîne JSON pour obtenir l'objet utilisateur
      this.user = JSON.parse(userString);

    }




  }
  isButtonVisible(): boolean {
    return this.isMine;
  }

  getProfil() {
    // 
    let params = new HttpParams().set('userId', this.userId);

    this.userProfilService.getProfil(params).subscribe(
      (res:any) => {
        // console.log('reussite', res);
        // this.toastr.success('reussite');

        if (this.userId == JSON.parse(sessionStorage.getItem('user')!).id) {
          // console.log('tgegte');
          sessionStorage.setItem('post', JSON.stringify(res));

          sessionStorage.setItem('profil', JSON.stringify(res));
          this.isMine = true
          this.profil = res;

        } else {
          this.profil = res;
        }
        // console.log('eeeeeeeeeeeeee,jyteku-,yer', this.profil);
        this.userProfilService.getStaus(res.user).subscribe(
          (res:any)=>{
            console.log('statuuuuus',res);
            
              this.status=res.message[1]
          },
          (err:any)=>{
            console.log('statuuedsdfdsfsfffuuus',err);
            
              this.status="OFFLINE"
          }
        )
        this.updateViewNmbr();
        this.postService.getFile( this.profil.file.fileDownloadUri).subscribe(

          (fileBlob: Blob) => {

          console.log(fileBlob.type);
          this.profilImage = URL.createObjectURL(fileBlob)// Assurez-vous que le champ est correct
          
        
          },

        );
      },
      err => {
        console.log('failed', err);
        // this.toastr.error(err.error.message, 'failed');
      }
    );
  }

  getPost(userId: any) {
    this.postService.getUserPosts(userId).subscribe(
     ( res:any) => {

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
       
       this.posts = res;


// console.log('ahmedsssss',this.posts);

        // Faites quelque chose avec les posts récupérés, par exemple, assignez-les à une variable de composant
        // this.posts = res;
        
  
        // Variables pour le comptage des réactions
        const reactionsCounts: number[] = [];
  
        if (this.posts.content) {
          this.posts.content.forEach((post: any) => {
            const reactionsCount = post.idreacts.length;
            post.reactionsCount = reactionsCount;
            this.totalReactionsCount += reactionsCount;
            reactionsCounts.push(reactionsCount);
          });
        }
  
        // Affichez les valeurs dans la console
        // console.log('Total des réactions pour tous les posts :', this.totalReactionsCount);
        // console.log('Réactions pour chaque post :', reactionsCounts);
  
        // Faites quelque chose avec les posts récupérés, par exemple, assignez-les à une variable de composant
        // this.posts = res;
      },
      err => {
        // console.log('failed to get posts', err);
        // Vérifiez si err.error et err.error.message existent avant d'y accéder
      }
    );
  }
  
  
  // Exemple dans UserCompteComponent
  getFile(fileDownloadUri: any) {

    this.postService.getFile( fileDownloadUri).subscribe(
      (fileBlob: Blob) => {
        // Handle the successful response here
        // console.log('File downloaded successfully:', fileBlob);
        return URL.createObjectURL(fileBlob);
    
      },
      (error :any) => {
        // Handle errors
        console.error('Error downloading file:', error);
      }
    );
    

  }
  deletePost(postId: string) {
    if (confirm('Are you sure you want to delete this post?')) {
      // console.log(postId);

      this.postService.delete(postId).subscribe(
        (res) => {
          console.log(res);

          this.toastr.success('Post deleted successfully', 'Success');
          // After deleting the post, refresh the posts list
          window.location.reload();

        },
        (err) => {
          console.log(err);
          this.toastr.error('Error deleting post', 'Error');
        }
      );
    }
  }
  updateViewNmbr() {
    // console.log('Avant la fonction ddedd');
    // console.log("hhhhhhh",this.profil.id as string, JSON.parse(sessionStorage.getItem('profil')!).id);

    const storedProfileId = sessionStorage.getItem('lastViewedProfileId');
    if (storedProfileId !== this.profil.id) {
    this.userService.updateViewNbr(this.profil.id as string, JSON.parse(sessionStorage.getItem('profil')!).id).subscribe(
      (res) => {
        console.log('modification avec succès', res);
        // this.toastr.success('Modification avec succès');
        // sessionStorage.setItem('lastViewedProfileId', this.profil.id as string);
      },
      (err) => {
        console.log('échec de la modification', err);
        // this.toastr.error('Erreur de modification', 'Erreur');
      }
    );
    }
  }





  addnmbrReact(postId: any, index: any) {
    this.postService.addmnbrReact(this.profil.id as string, JSON.parse(sessionStorage.getItem('profil')!).id, postId).subscribe(
      (res) => {
        console.log('modification avec succès', res);
        // this.toastr.success('react avec succès');
        sessionStorage.setItem('lastViewedProfileId', this.profil.id as string);
        this.posts.content[index].idreacts.push(JSON.parse(sessionStorage.getItem('profil')!).id);
        this.posts.content[index].reactionsCount++;
      },
      (err) => {
        console.log('échec de la modification', err);
        this.toastr.error('Erreur de reacter', 'Erreur');
      }
    );
  }
    





    addOrGOToChat(){
    let  id=JSON.parse(sessionStorage.getItem('user')!).id

      if(JSON.parse(sessionStorage.getItem('user')!).roles.at(0)=='ROLE_RECRUTER')
      id=JSON.parse(sessionStorage.getItem('user')!).idEntreprise
    console.log('connected',id);
    console.log('visited',this.userId);
    
    
      this.chatService.addChat(this.userId,id).subscribe(
        (res:any)=>{
          console.log(res);
          this.router.navigate(['/id',res.chatId])
        },
        (err)=>{
          console.log(err);
        },
      )
    }





  
  subnmbrReact(postId: any, index: any) {
    this.postService.submnbrReact(this.profil.id as string, JSON.parse(sessionStorage.getItem('profil')!).id, postId).subscribe(
      (res) => {
        console.log('modification avec succès', res);
        // this.toastr.success('react annuler avec succès');
        sessionStorage.setItem('lastViewedProfileId', this.profil.id as string);
  
        const profileId = JSON.parse(sessionStorage.getItem('profil')!).id;
        const post = this.posts.content[index];
        const profileIndex = post.idreacts.indexOf(profileId);
  
        if (profileIndex !== -1) {
          post.idreacts.splice(profileIndex, 1);
          post.reactionsCount--;
        }
      },
      (err) => {
        console.log('échec de la modification', err);
        this.toastr.error('Erreur de  supprime reacter', 'Erreur');
      }
    );
  }
  
  toggleReact(post: any, index: any) {
    const hasReacted = this.hasReacted(post);
  
    if (hasReacted) {
      this.subnmbrReact(post.id, index);
    } else {
      this.addnmbrReact(post.id, index);
    }
  }
  
      hasReacted(post: any): boolean {
        const loggedInUserId = JSON.parse(sessionStorage.getItem('profil')!).id;
        return post.idreacts.includes(loggedInUserId);
      }
  }


