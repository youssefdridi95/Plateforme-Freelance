import { Component} from '@angular/core';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EntrepriseService } from '../services/entreprise.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profil-entreprise',
  templateUrl: './profil-entreprise.component.html',
  styleUrls: ['./profil-entreprise.component.css']
})
export class ProfilEntrepriseComponent {
  post = false;
  // posts: any;
  arrowUp: boolean = false;
  entreprise:any;
  emailpro = JSON.parse(sessionStorage.getItem('user')!).email;
  nom = JSON.parse(sessionStorage.getItem('profil')!).profileHeadline;

  idEntreprise :any 
  constructor(
    private enterpriseService: EntrepriseService,
    private route: ActivatedRoute,
    private toastr: ToastrService,private router: Router) {
      this.route.params.subscribe(params => {
        this.idEntreprise = params['id'];
      this.getEntrepriseById( this.idEntreprise)
       
      });
     
    }
  
  ngOnInit (): void{
    console.log(this.entreprise);


}

  // ... autres méthodes

  navigateToCvCreer(link: String) {
    
    this.router.navigate([link]);

  }
  username: string = '';
  email: string = '';
  getEntrepriseById(idEntreprise: string) {
    this.enterpriseService.getEntrepriseByid(idEntreprise).subscribe(
      (data: any) => {
          this.entreprise = data; 
        
 // Assuming the API returns an array of users
      },
      error => {
        console.error('Error fetching entreprises:', error);
      }
    );
  }

}