import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-entreprise',
  templateUrl: './login-entreprise.component.html',
  styleUrls: ['./login-entreprise.component.css']
})
export class LoginEntrepriseComponent {


  loginForm !:FormGroup
  user:any={};
  constructor() { }

  ngOnInit (): void{

  }

  login(){
  console.log('here into login', this.user)
  }
}