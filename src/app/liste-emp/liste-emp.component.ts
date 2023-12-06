import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../services/post.service';
import { UserProfil } from '../services/user-profil';

@Component({
  selector: 'app-liste-emp',
  templateUrl: './liste-emp.component.html',
  styleUrls: ['./liste-emp.component.css']
})
export class ListeEmpComponent implements OnInit {
  talents: any
  profil: any; // Déclarez la propriété profil ici
skill : any
  constructor(private toastr: ToastrService, private userProfilService: UserProfil, private router: Router, private route: ActivatedRoute, private postService: PostService) {
    this.route.paramMap.subscribe(params => { 
      this.skill= params.get('skill')?.toUpperCase() ;
      
      
      }) ;
  
  }

  ngOnInit() {
    this.profil = JSON.parse(sessionStorage.getItem('profil')!);

      if (this.skill) {
        this.getSkillUser(this.skill);
      }
  
  }
  
  getSkillUser(skill: any) {
    let params = new HttpParams().set('skill', skill);

    this.userProfilService.getUserBySkill(params).subscribe(
      res => {
        this.talents = res 
        console.log('reussite', res);
        this.toastr.success('reussite');
        // this.talents = res;
      },
      err => {
        console.log('failed', err);
        // this.toastr.error(err.error.message, 'failed');
      }
    );
  }
}
