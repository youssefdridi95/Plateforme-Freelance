import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../services/post.service';
import { UserProfil } from '../services/user-profil';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent {

  constructor(private toastr: ToastrService, private userProfilService: UserProfil, private router: Router, private roote: ActivatedRoute, private postService: PostService) {
  }

  getPost(userId: any): void {
    this.postService.getSkillsPosts(userId).subscribe(
      res => {
        // this.posts = res;
        console.log('reussite des posts', res);
        // this.toastr.success('post ')
        // Faites quelque chose avec les posts récupérés, par exemple, assignez-les à une variable de composant
        // this.posts = res;
        sessionStorage.setItem('posts', JSON.stringify(res))

      },
      err => {
        console.log('failed to get posts', err);

        // Vérifiez si err.error et err.error.message existent avant d'y accéder

      }
    );
  }
}
