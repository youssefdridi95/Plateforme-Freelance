import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntrepriseService } from '../services/entreprise.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Add this line
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-entrepriseupdate',
  templateUrl: './entrepriseupdate.component.html',
  styleUrls: ['./entrepriseupdate.component.css'],
})
export class EntrepriseupdateComponent {


  updateForm !:FormGroup;
    constructor(
      private formBuilder: FormBuilder,
      private enterpriseService: EntrepriseService,
      private route: ActivatedRoute,
      private toastr: ToastrService,
      private router: Router
    ) {}
  
    ngOnInit (): void{
    this.updateForm= this.formBuilder.group({
      title:[JSON.parse(sessionStorage.getItem('profil')!).profileHeadline,[Validators.minLength(3),Validators.required]],
      adresse:[JSON.parse(sessionStorage.getItem('profil')!).adresse,[Validators.minLength(5),Validators.required]],
      timezone : [JSON.parse(sessionStorage.getItem('profil')!).timezone, Validators.required],
      activity: [JSON.parse(sessionStorage.getItem('profil')!).activity, Validators.required],
      
     },
  
    )
    // thisJSON.parse(sessionStorage.getItem('user')!).id)
  
    }

  
  update() {
  
    let userId = JSON.parse(sessionStorage.getItem('profil')!).id;
    let params = new HttpParams()
    .set('profileHeadline', this.updateForm.value.title)
    .set('adresse', this.updateForm.value.adresse)
    .set('timezone', this.updateForm.value.timezone)
    .set('activity', this.updateForm.value.activity)
    .set('id', userId);
  
 const data={
  "id": JSON.parse(sessionStorage.getItem('profil')!).id,
  "profileHeadline": this.updateForm.value.title,
  "activity": this.updateForm.value.activity,
  "timezone": this.updateForm.value.timezone,
  "adresse": this.updateForm.value.adresse
}
  
        this.enterpriseService.updateEntreprise(data).subscribe(
          (res) => {
            console.log('Modification reussite', res);
            this.toastr.success('Modification reussite');
            console.log(userId);
            
            //this.router.navigate(['/entreprise/profil',userId])
          },
          (err) => {
            console.log('failed', err);
            this.toastr.error(err.error.message, 'failed');
          }
        );
      }
      }
    