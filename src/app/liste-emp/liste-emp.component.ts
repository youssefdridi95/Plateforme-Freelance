import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../services/post.service';
import { UserProfil } from '../services/user-profil';
import { ChatsService } from '../services/chats.service';
import { skills } from 'src/skills';


@Component({
  selector: 'app-liste-emp',
  templateUrl: './liste-emp.component.html',
  styleUrls: ['./liste-emp.component.css']
})
export class ListeEmpComponent implements OnInit {
  talents: any
  filtredtalents: any
  profil: any; // Déclarez la propriété profil ici
  skill: any;
  selectedTimezone = "";
  niveauSkill = '';
  secondSkill = '';
  devSkills = skills
  constructor(private chatService: ChatsService, private toastr: ToastrService, private userProfilService: UserProfil, private router: Router, private route: ActivatedRoute, private postService: PostService) {


  }

  ngOnInit() {
    this.profil = JSON.parse(sessionStorage.getItem('profil')!);
    this.route.paramMap.subscribe(params => {
      this.skill = params.get('skill')?.toUpperCase();


    });
    if (this.skill) {
      this.getSkillUser(this.skill);
    }


  }

  getSkillUser(skill: any) {
    let params = new HttpParams().set('skill', skill);

    this.userProfilService.getUserBySkill(params).subscribe(
      res => {
        this.talents = res
       
        console.log(this.talents);
        this.filtredtalents=this.talents;

        // this.talents = res;
      },
      err => {
        console.log('failed', err);
        // this.toastr.error(err.error.message, 'failed');
      }
    );
  }


  onTimezone() {
    console.log(this.selectedTimezone);
    this.filtredtalents.content = this.talents.content.filter((talent: any) => talent.timezone.toLowerCase().includes(this.selectedTimezone.toLowerCase()));

  }
  onniveauSkill() {
    console.log(this.niveauSkill);

    this.filtredtalents.content =  this.filtredtalents.content.filter((talent: any) => talent.resume.competences.at(0).niveau.toLowerCase().includes(this.niveauSkill.toLowerCase()));

    console.log(this.talents);

  }

  onSecondSkill() {
    console.log(this.secondSkill);

    this.filtredtalents.content = this.filtredtalents.content.filter((item:any) => {
      // Assuming 'competences' is the property that holds the array of skills
      const skills = item.resume?.competences || [];
    
      // Check if the target skill exists in any competence entry
      return skills.some((competence:any) => competence.title.toLowerCase() === this.secondSkill.toLowerCase());
    });
    
    console.log(this.talents);

  }

  addOrGOToChat(talentId: any) {
    let id = JSON.parse(sessionStorage.getItem('user')!).id

    if (JSON.parse(sessionStorage.getItem('user')!).roles.at(0) == 'ROLE_RECRUTER')
      id = JSON.parse(sessionStorage.getItem('user')!).idEntreprise


    console.log("talentt", talentId);
    console.log("entreprise", id);

    this.chatService.addChat(talentId, id).subscribe(
      (res: any) => {
        console.log(res);
        this.router.navigate(['/id', res.chatId])
      },
      (err) => {
        console.log(err);
      },
    )
  }
  reload() {
    this.getSkillUser(this.skill);
    this.selectedTimezone = ""
    this.niveauSkill = ""
    this.secondSkill = ""
  }
}
