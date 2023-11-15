import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-entreprise',
  templateUrl: './login-entreprise.component.html',
  styleUrls: ['./login-entreprise.component.css']
})
export class LoginEntrepriseComponent {
  loginForm!:FormGroup
  user:any={};
  
  display :any;
  signupForm !:FormGroup
  tab!:["gmail","outlook"]
  constructor(private formBuilder:FormBuilder, private route: ActivatedRoute) { 
  this.route.paramMap.subscribe(params => { this.display= params.get('type') ;console.log(this.display)}) ;

  }



  ngOnInit (): void {
  this.signupForm = this.formBuilder.group({
    email:['',[Validators.minLength(3),Validators.required]],
    password:['',Validators.minLength(2)],
    confirmPwd:['',Validators.minLength(2)],
   })
} 
  

  signup(){
  console.log('here into signupform', this.signupForm.value)
  }

  isMush=true
  isPro=true
  validateEmail(email: string): boolean {
    console.log(email);
    
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    // Vérifier que le domaine n'est ni "gmail" ni "outlook"
    const domain = email.split('@')[1];
    const isExcludedDomain = ["gmail", "outlook", "yahoo", "mail", "protonmail", "zoho", "aol", "yandex", "gmx", "Hotmail", " icloud"].some(excluded => domain.includes(excluded));
  
    return emailRegex.test(email) && !isExcludedDomain;
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
  }
 
}

