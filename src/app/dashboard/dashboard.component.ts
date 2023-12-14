import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../services/post.service';
import { UserProfil } from '../services/user-profil';
import { UserService } from '../services/user.service';
import { SharedService } from '../shared.service';
import { ChatsService } from '../services/chats.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  profil: any; // Make sure the type of 'profil' matches the structure of your data
  posts: any;
  userId: any;
   totalReactionsCount = 0;
   totalPosts: number = 0;
   useridchat =''
   chat:  number = 0;
  constructor(private toastr: ToastrService, protected chatsService: ChatsService, private userProfilService: UserProfil, 
    private router: Router, private roote: ActivatedRoute, private postService: PostService, 
    private userService: UserService, private sharedService: SharedService) {
    // Subscribe to the shared service observables
    this.sharedService.totalReactionsCount$.subscribe(totalCount => {
      // console.log('Total Reactions Count:', totalCount);
    });
  
    this.sharedService.reactionsCounts$.subscribe(counts => {
      // console.log('Reactions Counts:', counts);
    });
    this.roote.paramMap.subscribe(params => {
      this.userId = params.get('id')
      this.getPost(this.userId);
      // console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', this.profil);

    })
    let  id=JSON.parse(sessionStorage.getItem('user')!).id
 
    if(JSON.parse(sessionStorage.getItem('user')!).roles.at(0)=='ROLE_RECRUTER')
    id = JSON.parse(sessionStorage.getItem('user')!).idEntreprise
    this.useridchat = id
  }

  generatePdf() {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('hello ', 10, 10);
    doc.save('mypdf.pdf');
  }

  ngOnInit(): void {
    this.chatsService.getChatList(this.useridchat).subscribe(
      (res: any) => {

 this.chat = res.totalElements
console.log('bbbbbb', this.chat);

        // console.log(res);

     
      },
      (err) => {
        // console.log(err);
      });
    // Retrieve 'profil' from sessionStorage
    const profilString = sessionStorage.getItem('profil');

    if (profilString) {
      // Parse the JSON string to get the 'profil' object
      this.profil = JSON.parse(profilString);
    }
    const postString = sessionStorage.getItem('post');

    if (postString) {
      // Parse the JSON string to get the 'profil' object
      this.posts = JSON.parse(postString);
    }
    this.getPost(this.userId);
  }
  getPost(userId: any) {
    this.postService.getUserPosts(userId).subscribe(
     ( res:any) => {

        for(let post of res.content)
      {  
        post['filesURLS']=[]

        let filesURLS:any[]=[]
        for (let file of post.files) {
          this.postService.getFile( file.fileDownloadUri).subscribe(

        // this.postService.getFile( "/Profiles/Individuals/656efd79e6e04003ea53bbaa/2023-12-06/2023-12-06 134423 163Z/Untitled.jpg//").subscribe(
          (fileBlob: Blob) => {
            // Handle the successful response here
            // console.log('File downloaded successfully:', fileBlob);
          
            filesURLS.push( URL.createObjectURL(fileBlob));
            this.totalPosts = res.totalElements;

            console.log('Nombre total de posts :', this.totalPosts);
          },
          (error :any) => {
            // Handle errors
            filesURLS.push('image');
            // console.error('Error downloading file:', error);
          }
        );
                 
          
      }
      post['filesURLS'].push(filesURLS)
       }
       
        this.posts = res;

// console.log('alllllllllll',this.posts);

        // Faites quelque chose avec les posts récupérés, par exemple, assignez-les à une variable de composant
        // this.posts = res;
        
        sessionStorage.setItem('postss', JSON.stringify(res));
  
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
        // console.log('Total des réactions pour tous les posts777777777 :', this.totalReactionsCount);
        // console.log('Réactions pour chaque post77777777777 :', reactionsCounts);
  
        // Faites quelque chose avec les posts récupérés, par exemple, assignez-les à une variable de composant
        // this.posts = res;
      },
      err => {
        // console.log('failed to get posts', err);
        // Vérifiez si err.error et err.error.message existent avant d'y accéder
      }
    );
  }
  
  

}
