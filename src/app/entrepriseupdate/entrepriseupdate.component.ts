import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntrepriseService } from '../services/entreprise.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-entrepriseupdate',
  standalone: true,
  templateUrl: './entrepriseupdate.component.html',
  styleUrls: ['./entrepriseupdate.component.css']
})
export class EntrepriseupdateComponent {


  updateForm !:FormGroup;
    constructor(
      private formBuilder: FormBuilder,
      private enterpriseService: EntrepriseService,
      private route: ActivatedRoute,
      private toastr: ToastrService,private router: Router
    ) {}
  
    ngOnInit (): void{
    this.updateForm= this.formBuilder.group({
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
  
  update() {
  
    let userId = JSON.parse(sessionStorage.getItem('user')!).id;
    let params = new HttpParams()
    .set('title', this.updateForm.value.title)
    .set('adresse', this.updateForm.value.adresse)
    .set('timezone', this.updateForm.value.timezone)
    .set('activity', this.updateForm.value.activity)
    .set('userId', userId);
  
  
        const formData = new FormData();
    if (this.selectedFile)
        formData.append('file', this.selectedFile);
        
    
  
  
        this.enterpriseService.creationEntreprise(formData, params).subscribe(
          (res) => {
            console.log('reussite', res);
            this.toastr.success('reussite');
            this.router.navigate(['/entreprise/profil/:id']);
          },
          (err) => {
            console.log('failed', err);
            this.toastr.error(err.error.message, 'failed');
          }
        );
      }
      }
    