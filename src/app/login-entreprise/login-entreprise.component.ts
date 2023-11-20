import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrepriseService } from '../services/entreprise.service';
import { ToastrService } from 'ngx-toastr';



interface LoginResponse {
  id: string;
  token: string;
  type: string;
  username: string;
  email: string;
  roles: string[];
  msg: string;
}


@Component({
  selector: 'app-login-entreprise',
  templateUrl: './login-entreprise.component.html',
  styleUrls: ['./login-entreprise.component.css']
})
export class LoginEntrepriseComponent {
  loginForm!:FormGroup
  display :any;
  signupForm !:FormGroup
  constructor(private formBuilder:FormBuilder, private route: ActivatedRoute,private toastr : ToastrService,private  entrepriseService : EntrepriseService,private router: Router ) { 
  this.route.paramMap.subscribe(params => { this.display= params.get('type') ;}) ;

  }

  ngOnInit (): void {
  this.signupForm = this.formBuilder.group({
    username : ['', [Validators.required,Validators.minLength(4)]],
    email:['',[Validators.minLength(5),Validators.required]],
    password:['',[Validators.required,Validators.minLength(6)]],
    confirmPwd:['',[Validators.required,Validators.minLength(6)]],
  }
  
   )
   this.loginForm =  this.formBuilder.group({
    username : ['', [Validators.required,Validators.minLength(4)]],
    password:['',[Validators.required,Validators.minLength(6)]],
   })
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

   console.log(allowedDomains.includes(domain));
   
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
      'role' : 'entreprise' ,
    }
  
    this.entrepriseService.signup(entreprise).subscribe(
      res=>{
      
        
        this.toastr.success('a été crée avec succés','compte')
        this.navigateToPage('/entreprise/connexion/login', 1500)
  
      },
      err=>{
        console.log(err);
  
    this.toastr.error(err.error.message,'compte')
  
      }
    )}
    else
    this.toastr.error("Valider votre formulaire",'')



  }
  login() {
    
    const entreprise = {
      'username': this.loginForm.value.username,
      'password': this.loginForm.value.password,
    };
  
    this.entrepriseService.login(entreprise).subscribe(
      (res: any) => {
        const loginResponse: LoginResponse = res as LoginResponse;
      
        if (!loginResponse.roles.includes("ROLE_ENTREPRISE")) {
          this.toastr.error("vous n'êtes pas une entreprise.  essayez de se connecter en tant qu'un developpeur", 'erreur');
        } else {
          this.toastr.success('Connexion réussie', 'Compte');
          sessionStorage.setItem('user', JSON.stringify(res));
          this.navigateToPage('/entreprise/creation', 1500);
        }
      },
      err => {
        this.toastr.error(err.error.message, 'Compte');
      }
    );
  }
  
 
  navigateToPage(root: string, time:number=0) {
    // Adjust route paths based on the values passed in the HTML


    // Add a delay of 1000 milliseconds (1 second)
    setTimeout(() => {
      this.router.navigate([root]);
    }, time);
  }
 
}

