import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-entreprise',
  templateUrl: './signup-entreprise.component.html',
  styleUrls: ['./signup-entreprise.component.css']
})
export class SignupEntrepriseComponent {

  signupForm !:FormGroup
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit (): void{
  this.signupForm= this.formBuilder.group({
    nom:['',[Validators.minLength(3),Validators.required]],
    domaine:['',[Validators.minLength(2),Validators.required]],
    numero_fiscale:['',[Validators.minLength(11),Validators.required]],
    email_e:['',[Validators.minLength(3),Validators.required]],
    adresse:['',[Validators.minLength(5),Validators.required]],
    code_postal:['',[Validators.minLength(4),Validators.required]],
    num_tel:['',[Validators.minLength(6),Validators.required]],

   },

  )
  }
  

  signup(){
  console.log('here into signupform', this.signupForm.value)
  }
}
