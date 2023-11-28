import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntrepriseService } from '../services/entreprise.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-creation-entreprise',
  templateUrl: './creation-entreprise.component.html',
  styleUrls: ['./creation-entreprise.component.css']
})
export class CreationEntrepriseComponent {


  signupForm !:FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private enterpriseService: EntrepriseService,
    private route: ActivatedRoute,
    private toastr: ToastrService,private router: Router
  ) {}

  ngOnInit (): void{
  this.signupForm= this.formBuilder.group({
    title:['',[Validators.minLength(3),Validators.required]],
    adresse:['',[Validators.minLength(5),Validators.required]],
    timezone : ['', Validators.required],
    activity: ['', Validators.required],
    file :  ['' , [Validators.required] ],
     file2 : [ null ],
   },

  )
  // thisJSON.parse(sessionStorage.getItem('user')!).id)

  }
  selectedFile: File | null = null;

 
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files?.[0] || null;
    console.log( this.selectedFile);
    
  }

 creation() {

  let userId = JSON.parse(sessionStorage.getItem('user')!).id;
  let params = new HttpParams()
  .set('title', this.signupForm.value.title)
  .set('adresse', this.signupForm.value.adresse)
  .set('timezone', this.signupForm.value.timezone)
  .set('activity', this.signupForm.value.activity)
  .set('userId', userId);


      const formData = new FormData();
  if (this.selectedFile)
      formData.append('file', this.selectedFile);
      
  


      this.enterpriseService.creationEntreprise(formData,params).subscribe(
        res => {
          console.log('reussite',res);
          this.toastr.success('reussite')
          this.router.navigate(['/entreprise/profil']);

          // Ajoutez ici d'autres actions en cas de succès
        },
        err => {
          console.log('failed',err);
          this.toastr.error(err.error.message,'failed')

          // Ajoutez ici d'autres actions en cas d'erreur, comme l'affichage d'un message d'erreur avec Toastr
          // this.toastr.error(err.error.message, 'Connexion');

        }
      );  }
    }
  