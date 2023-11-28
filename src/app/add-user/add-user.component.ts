import { Component } from '@angular/core';
import { environments } from 'src/enviroments';
import { Env } from '../env';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntrepriseService } from '../services/entreprise.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  signupForm !:FormGroup
  env : Env = environments as Env
  constructor(private formBuilder:FormBuilder, private route: ActivatedRoute,private toastr : ToastrService,private  entrepriseService : EntrepriseService,private router: Router ) { 
  } 
    
  

  ngOnInit (): void {
  this.signupForm = this.formBuilder.group({
    username : ['', [Validators.required,Validators.minLength(4)]],
    email:['',[Validators.minLength(5),Validators.required]],
    password:['',[Validators.required,Validators.minLength(6)]],
    confirmPwd:['',[Validators.required,Validators.minLength(6)]],
  }
  
   )

} 
  
  isMush=true
  isPro=true
  validateEmail(email: string): boolean {
    // Extracting the domain from the email address
    const emailParts = email.split('@');
    if (emailParts.length !== 2) {
        // Invalid email format
        return false;
    }

    const domainWithDot = emailParts[1];
    const firstDotIndex = domainWithDot.indexOf('.');

    if (firstDotIndex === -1) {
        // No dot found in the domain, consider the whole domain
        return false;
    }

    const domain = domainWithDot.substring(0, firstDotIndex).toLowerCase();

    // List of allowed domains
    const allowedDomains = ["gmail", "outlook", "yahoo", "mail", "protonmail", "aol", "yandex", "gmx", "hotmail", "icloud"];


   
   return !allowedDomains.includes(domain);
}


  inscrire() {
    if (this.signupForm.get('password')!.value === this.signupForm.get('confirmPwd')!.value) {
      this.isMush =true
    } else {
      this.isMush = false;
    }

    if (this.validateEmail(this.signupForm.get('email')!.value)) {
      this.isPro =true
    } else {
      this.isPro = false;
    }
if (this.isMush && this.isPro)
    {const entreprise= {
      'username' : this.signupForm.value.username ,
      'email' : this.signupForm.value.email ,
      'password' : this.signupForm.value.password ,
      'role' : this.env.roles.entRoleAdmin ,
    }
    console.log(entreprise);
  
    this.entrepriseService.signup(entreprise).subscribe(
      res=>{
      
  console.log(res);
        
  this.router.navigate(['/verif/email/'+entreprise.role+'/'+entreprise.email]);
        
  this.toastr.success('a été crée avec succés ,merci de verifier votre email pour l\'activer' ,'compte')

      },
      err=>{
    console.log(err);
    this.toastr.error(err.error.message,'erreur')
      }
    )}
    else
    this.toastr.error("Valider votre formulaire",'')
  }
 
  
  
  
 
  navigateToPage(root: string, time:number=0) {
    // Adjust route paths based on the values passed in the HTML


    // Add a delay of 1000 milliseconds (1 second)
    setTimeout(() => {
      this.router.navigate([root]);
    }, time);
  }
 
}



