import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { HttpParams } from '@angular/common/http';
import { UserProfil } from '../services/user-profil';
import { EntrepriseService } from '../services/entreprise.service';


@Component({
  selector: 'app-talent-feed',
  templateUrl: './talent-feed.component.html',
  styleUrls: ['./talent-feed.component.css']
})
export class TalentFeedComponent {

//   constructor(private toastr: ToastrService, private router: Router, private roote: ActivatedRoute, private postService: PostService,private profil:UserProfil) {
// this.mainskill=JSON.parse(sessionStorage.getItem('profil')!).mainSkill
// this.getPost(this.mainskill);

//   }


//   mainskill: string = '';
//   posts: any 


//   ngOnInit() {
    
//   }


//   getPost(skill: any) {
//     this.postService.getPostsBySkill(skill).subscribe(
//       res => {
//         this.posts = res;
//         console.log(this.posts);
//         let postswithProfiles:any = []
       
//         for(let post of this.posts.content )
//       {  let params = new HttpParams().set('userId', post.user);
              
//             this.profil.getProfil(params).subscribe((profile)=>{
//               post.user=profile

//               postswithProfiles.push(post)
              
//             })}
//             this.posts=postswithProfiles
//         console.log('after for ', postswithProfiles);
//       },
//       err => {
//         console.log('failed to get posts', err);


//       }
//     );
//   }
//   // Exemple dans UserCompteComponent
//   getFile(fileDownloadUri: any) {

//     this.postService.getFile(fileDownloadUri).subscribe(
//       (blob: Blob) => {
//         return URL.createObjectURL(blob);
//       },
//       error => {
//         return 'https://th.bing.com/th/id/OIF.3rMDm1LTbMPxj0MbWPHlKQ?w=309&h=180&c=7&r=0&o=5&pid=1.7';
//         // console.error('Error fetching file:', error<);
//       }
//     );

//   }
// calculatePassedTime(date:any){
  
// const  datet= new Date(date)

// // Get the current date and time
// const currentDate = new Date();

// // Calculate the time difference in milliseconds
// const timeDifference = currentDate.getTime() -datet.getTime();

// const seconds = Math.floor(timeDifference / 1000);
// const minutes = Math.floor(seconds / 60);
// const hours = Math.floor(minutes / 60);
// const days = Math.floor(hours / 24);

// return(` ${days} d, ${hours % 24} h, ${minutes % 60} min`);

// }

 // posts: any;
 arrowUp: boolean = false;
 entreprise:any;
 posts: any;
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
   private toastr: ToastrService,private router: Router, private postService: PostService) {
     this.route.params.subscribe(params => {
       this.idEntreprise = JSON.parse(sessionStorage.getItem('user')!).id;
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


 username: string = '';
 email: string = '';
 getEntrepriseById(idEntreprise: string) {
   this.enterpriseService.getEntrepriseByid(idEntreprise).subscribe(
     (data: any) => {
         this.entreprise = data; 
         if (idEntreprise == JSON.parse(sessionStorage.getItem('user')!).id ||
         idEntreprise == JSON.parse(sessionStorage.getItem('user')!).idEntreprise ) {
           sessionStorage.setItem('profil',JSON.stringify(data));
       
          }
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

