import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-sign',
  templateUrl: './user-sign.component.html',
  styleUrls: ['./user-sign.component.css']
})
export class UserSignComponent {



  constructor(private route : Router){}


  goToRegister(){
    this.route.navigate(["user/register"]);
  }
}
