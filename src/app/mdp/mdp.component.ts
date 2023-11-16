import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MotdepasseService } from '../services/motdepasse.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mdp',
  templateUrl: './mdp.component.html',
  styleUrls: ['./mdp.component.css']
})
export class MdpComponent {

  emailForm !:FormGroup
  constructor(private formBuilder:FormBuilder,private toastr : ToastrService,private  mail : MotdepasseService,private router: Router ) {};

  

  ngOnInit (): void {
  this.emailForm = this.formBuilder.group({
    email:['',[Validators.minLength(5),Validators.required]],
   
  }
  
   )}
   requestPassworChange () {
 console.log(this.emailForm);
 
    this.mail.recuperationMdp(this.emailForm.value.email).subscribe(
      res => {
        this.toastr.success('merci de verifiez votre email pour reinitialiser votre mot de passe', 'email');
 
        


      },
      err => {
        console.log(err)
        this.toastr.error(err.error.message, 'erreur');
      }
    );
  }
}
