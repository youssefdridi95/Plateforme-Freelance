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

  constructor(private toastr: ToastrService, private router: Router, private roote: ActivatedRoute, private postService: PostService, private profil: UserProfil,private enterpriseService: EntrepriseService) {
 

  }
      ;
  selectedSortOption: 'asc' | 'desc' = 'asc';
  mainskill: string = '';
  posts: any
  searchTerm: string = '';
  filteredPosts: any; // This array will store the filtered posts


  ngOnInit() {
    this.mainskill = JSON.parse(sessionStorage.getItem('profil')!).mainSkill
    console.log(this.mainskill);
    
   this.getPost(this.mainskill);
  }
  

  nom = JSON.parse(sessionStorage.getItem('profil')!).anonyme;
  idreacts = JSON.parse(sessionStorage.getItem('profil')!).anonyme;
  sortPostsByDate(order: 'asc' | 'desc'): void {
    this.posts.sort((a: { date: string }, b: { date: string }) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }
  filterPosts(): void {
    
    // Filter posts based on the description using the searchTerm
   this.filteredPosts= this.posts.filter((post: any) => post.desc.toLowerCase().includes(this.searchTerm.toLowerCase()));

  }


  sortPostsByLikes(): void {
     console.log(this.posts);

    this.posts = this.posts.sort((a: { idreacts: any[] }, b: { idreacts: any[] }) => {
      return b.idreacts.length - a.idreacts.length;
    })

  }


  getPost(skill: any) {
    this.postService.getPostsBySkill(skill).subscribe(
      (res: any) => {
        res['filesURLS']=[]
        for(let post of res.content )
      { 
            if(post.type === 'TALENT')
         {   let params = new HttpParams().set('userId', post.user);
               this.profil.getProfil(params).subscribe((profile)=>{
              post.user=profile

            })}
            else {
            
                this.enterpriseService.getEntrepriseByid(post.user).subscribe(
                  (profil: any) => {
                    post.user=profil

                  },
                  error => {
                    console.error('Erreur lors de la récupération des entreprises:', error);
                  }
                );
              
            }
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
            this.posts=res.content
            this.filteredPosts=res.content
        console.log('after for ', this.posts);
      },
      err => {
        console.log('failed to get posts', err);
        this.posts=[];

      }
    );
  }
  // Exemple dans UserCompteComponent
  getFile(fileDownloadUri: any) {
    console.log(JSON.parse(sessionStorage.getItem('profil')!).id);

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
  calculatePassedTime(date: any) {

    const datet = new Date(date)

    // Get the current date and time
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate.getTime() - datet.getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return (` ${days} d, ${hours % 24} h, ${minutes % 60} min`);

  }
  
  addnmbrReact(postId: any, index : any) {
    
    this.postService.addmnbrReact(this.posts.at(index).user.id as string, JSON.parse(sessionStorage.getItem('profil')!).id, postId).subscribe(
    
      (res) => {
        console.log('modification avec succès', res);
       // this.toastr.success('react avec succès');
        // sessionStorage.setItem('lastViewedProfileId', this.profil.id as string);
     console.log(this.posts.at(index));
     
     this.posts.at(index).idreacts.push(JSON.parse(sessionStorage.getItem('profil')!).id);
      },
      (err) => {
        console.log('échec de la modification', err);
        this.toastr.error('Erreur de reacter', 'Erreur');
            console.log('ppppp',this.posts.at(index).user.id, JSON.parse(sessionStorage.getItem('profil')!).id, postId);
       
        
      }
    );
  }
  subnmbrReact(postId: any, index: any) {
    this.postService.submnbrReact(this.posts.at(index).user.id as string, JSON.parse(sessionStorage.getItem('profil')!).id, postId).subscribe(
      (res) => {
        console.log('modification avec succès', res);
      //  this.toastr.success('react annuler avec succès');
        this.posts.at(index).idreacts= this.posts.at(index).idreacts.filter((item : any)  => item !== JSON.parse(sessionStorage.getItem('profil')!).id);

        // sessionStorage.setItem('lastViewedProfileId', this.profil.id as string);
  
        // const profileId = JSON.parse(sessionStorage.getItem('profil')!).id;
        // const post = this.posts.content[index];
        // const profileIndex = post.idreacts.indexOf(profileId);
  
        // if (profileIndex !== -1) {
        //   post.idreacts.splice(profileIndex, 1);
        //   post.reactionsCount--;
        // }
      },
      (err) => {
        console.log('échec de la modification', err);
        this.toastr.error('Erreur de  supprime react', 'Erreur');
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

      navigate(type:any,id : any){
        if (type ==="TALENT")
        this.router.navigate(['user/compte',id])
      else 
      this.router.navigate(['entreprise/profil',id])

    }
  }



