import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { HttpParams } from '@angular/common/http';
import { UserProfil } from '../services/user-profil';

@Component({
  selector: 'app-talent-feed',
  templateUrl: './talent-feed.component.html',
  styleUrls: ['./talent-feed.component.css']
})
export class TalentFeedComponent {

  constructor(private toastr: ToastrService, private router: Router, private roote: ActivatedRoute, private postService: PostService,private profil:UserProfil) {
this.mainskill=JSON.parse(sessionStorage.getItem('profil')!).mainSkill
this.getPost(this.mainskill);

  }


  mainskill: string = '';
  posts: any 


  ngOnInit() {
    
  }


  getPost(skill: any) {
    this.postService.getPostsBySkill(skill).subscribe(
      res => {
        this.posts = res;
        console.log(this.posts);
        let postswithProfiles = []
       
        for(let post of this.posts.content )
      {  let params = new HttpParams().set('userId', post.user);
              
            this.profil.getProfil(params).subscribe((profile)=>{
              post.user=profile
              console.log('proffffff',post);

              postswithProfiles.push()
              
            })}
        console.log('get des posts', res);
      },
      err => {
        console.log('failed to get posts', err);


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

}

