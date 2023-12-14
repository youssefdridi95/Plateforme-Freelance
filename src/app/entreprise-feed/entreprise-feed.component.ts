import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { UserProfil } from '../services/user-profil';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-entreprise-feed',
  templateUrl: './entreprise-feed.component.html',
  styleUrls: ['./entreprise-feed.component.css']
})
export class EntrepriseFeedComponent {
  constructor(private toastr: ToastrService, private router: Router, private route: ActivatedRoute , private postService: PostService,private profil:UserProfil) {
    this.route.paramMap.subscribe(params => { 
      this.skill= params.get('skill') ;
      
      
      }) ;
  
    this.getPost(this.skill);
    
      }
    
    
      skill:  any = '';
      posts: any 
    profile: any
      ngOnInit() {
        this.profile = JSON.parse(sessionStorage.getItem('profil')!);

      }
    
      
      option :string = 'talent'
 

  rechercher() {
     if(this.option==='talent')
    this.router.navigate(['/talents/list', this.skill]);
  else
  this.router.navigate(['/entreprise/feed', this.skill]);

  }
      getPost(skill: any) {
        this.postService.getPostsBySkill(skill).subscribe(
          res => {
            this.posts = res;
            console.log(this.posts);
            let postswithProfiles:any = []
           
            for(let post of this.posts.content )
          {  let params = new HttpParams().set('userId', post.user);
                  
                this.profil.getProfil(params).subscribe((profile)=>{
                  post.user=profile
    
                  postswithProfiles.push(post)
                  
                })}
                this.posts=postswithProfiles
            console.log('after for ', postswithProfiles);
          },
          err => {
            console.log('failed to get posts', err);
            this.posts=[];
    
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
    calculatePassedTime(date:any){
      
    const  datet= new Date(date)
    
    // Get the current date and time
    const currentDate = new Date();
    
    // Calculate the time difference in milliseconds
    const timeDifference = currentDate.getTime() -datet.getTime();
    
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    return(` ${days} d, ${hours % 24} h, ${minutes % 60} min`);
    
    }
    }
    
    