import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../confirmPwd';

@Component({
  selector: 'app-login-entreprise',
  templateUrl: './login-entreprise.component.html',
  styleUrls: ['./login-entreprise.component.css']
})
export class LoginEntrepriseComponent {
  display =true;
  signupForm !:FormGroup
  
  constructor(private formBuilder:FormBuilder) { }

 

  ngOnInit (): void {
  this.signupForm = this.formBuilder.group({
    email:['',[Validators.minLength(3),Validators.required]],
    password:['',Validators.minLength(2)],
    confirmPwd:[''],
   },
{
  Validators:MustMatch('password','confirmPwd')
})
} 
  

  signup(){
  console.log('here into signupform', this.signupForm.value)
  }
}

