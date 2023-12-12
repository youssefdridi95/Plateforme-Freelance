import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserProfil } from '../services/user-profil';
import { map, catchError, of, Observable } from 'rxjs';
import { PostService } from '../services/post.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../services/user.service';
import { ChatsService } from '../services/chats.service';

@Component({
  selector: 'app-user-compte',
  templateUrl: './user-compte.component.html',
  styleUrls: ['./user-compte.component.css']
})

export class UserCompteComponent {

  constructor(private chatService :ChatsService,private toastr: ToastrService, private userProfilService: UserProfil, private router: Router, private roote: ActivatedRoute, private postService: PostService, private userService: UserService) {

    this.roote.paramMap.subscribe(params => {
      this.userId = params.get('id')
      this.getProfil();
      this.getPost(this.userId);
      console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', this.profil);

    })
  }

  navigateToCvCreer(link: String) {

    this.router.navigate([link]);

  }
  pub = false;
  username: string = '';
  email: string = '';
  userId: any;
  profil: any;
  posts: any;
  profilImage: string = '';  // Ajoutez cette ligne dans votre classe
  test: any;
  isMine = false
  // user-compte.component.ts
  userImage: string = '';  // Ajoutez cette ligne dans votre classe

  // Dans la méthode ngOnInit
  ngOnInit() {





  }
  isButtonVisible(): boolean {
    return this.isMine;
  }

  getProfil() {
    // 
    let params = new HttpParams().set('userId', this.userId);

    this.userProfilService.getProfil(params).subscribe(
      res => {
        // console.log('reussite', res);
        // this.toastr.success('reussite');

        if (this.userId == JSON.parse(sessionStorage.getItem('user')!).id) {
          console.log('tgegte');
          sessionStorage.setItem('post', JSON.stringify(res));

          sessionStorage.setItem('profil', JSON.stringify(res));
          this.isMine = true
          this.profil = res;

          this.profilImage = this.profil.file.fileDownloadUri;  // Assurez-vous que le champ est correct
        } else {
          this.profil = res;
          this.profilImage = this.profil.file.fileDownloadUri;  // Assurez-vous que le champ est correct
        }
        console.log('eeeeeeeeeeeeee,jyteku-,yer', this.profil);
        this.updateViewNmbr();

      },
      err => {
        console.log('failed', err);
        // this.toastr.error(err.error.message, 'failed');
      }
    );
  }

  getPost(userId: any) {

    this.postService.getUserPosts(userId).subscribe(
      res => {
        this.posts = res;

        // Faites quelque chose avec les posts récupérés, par exemple, assignez-les à une variable de composant
        // this.posts = res;

      },
      err => {
        console.log('failed to get posts', err);

        // Vérifiez si err.error et err.error.message existent avant d'y accéder

      }
    );
  }
  // Exemple dans UserCompteComponent
  getFile(fileDownloadUri: any) {

    this.postService.getFile(fileDownloadUri).subscribe(
      (blob: Blob) => {
        return URL.createObjectURL(blob);
      },
      error => {
        return 'https://th.bing.com/th/id/OIF.3rMDm1LTbMPxj0MbWPHlKQ?w=309&h=180&c=7&r=0&o=5&pid=1.7';
        // console.error('Error fetching file:', error<);
      }
    );

  }
  deletePost(postId: string) {
    if (confirm('Are you sure you want to delete this post?')) {
      console.log(postId);

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
    console.log('Avant la fonction ddedd');
    console.log("hhhhhhh",this.profil.id as string, JSON.parse(sessionStorage.getItem('profil')!).id);

    const storedProfileId = sessionStorage.getItem('lastViewedProfileId');
    if (storedProfileId !== this.profil.id) {
    this.userService.updateViewNbr(this.profil.id as string, JSON.parse(sessionStorage.getItem('profil')!).id).subscribe(
      (res) => {
        console.log('modification avec succès', res);
        this.toastr.success('Modification avec succès');
        sessionStorage.setItem('lastViewedProfileId', this.profil.id as string);
      },
      (err) => {
        console.log('échec de la modification', err);
        this.toastr.error('Erreur de modification', 'Erreur');
      }
    );
    }
  }

  addmnbrReact(postId:any) {
    console.log('Avant la fonction ddedd');
    console.log(postId);


    this.postService.addmnbrReact(this.profil.id as string, JSON.parse(sessionStorage.getItem('profil')!).id,postId  ).subscribe(
      (res) => {
        console.log('modification avec succès', res);
        this.toastr.success('react avec succès');
        sessionStorage.setItem('lastViewedProfileId', this.profil.id as string);
      },
      (err) => {
        console.log('échec de la modification', err);
        this.toastr.error('Erreur de reacter', 'Erreur');
      }
    );
    }





    addOrGOToChat(){
      this.chatService.addChat(this.userId,JSON.parse(sessionStorage.getItem('user')!).id).subscribe(
        (res)=>{
          console.log(res);
        },
        (err)=>{
          console.log(err);
        },
      )
    }





  }


