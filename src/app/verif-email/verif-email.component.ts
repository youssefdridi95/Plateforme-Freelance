import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VerifEmailService } from '../services/verif-email.service';
import { environments } from 'src/enviroments';
import { Env } from '../env';

@Component({
  selector: 'app-verif-email',
  templateUrl: './verif-email.component.html',
  styleUrls: ['./verif-email.component.css']
})
export class VerifEmailComponent {


  env : Env = environments as Env

  email :any
  role:any
  otpForm !:FormGroup
  constructor(private route: ActivatedRoute,private formBuilder:FormBuilder,private toastr : ToastrService,private router: Router ,private service:VerifEmailService) {
    this.route.paramMap.subscribe(params => { 
    this.email= params.get('email') ;
    this.role= params.get('role') ;
    
    }) ;

  };


  


  ngOnInit (): void {
  this.otpForm = this.formBuilder.group({

    otp:['',[Validators.required]],
  }
  
   )}


   navigateToPage(root: string, time:number=0) {
    // Adjust route paths based on the values passed in the HTML
    // Add a delay of 1000 milliseconds (1 second)
    setTimeout(() => {
      this.router.navigate([root]);
    }, time);
  }



  verifCompte() {
    const compte= {
      'email' : this.email ,
      'codeVerifMail' : this.otpForm.value.otp ,
    }

    this.service.verif(compte).subscribe(
      res=>{
        console.log(res);
        if (this.role === this.env.roles.userRole)
        this.router.navigate(['/user/connexion/signin']);
      else  if (this.role === this.env.roles.entRoleAdmin)
      this.router.navigate(['/entreprise/connexion/login']);
        else 
        this.router.navigate(['/role']);

        this.toastr.success('a été activé avec succés','compte')

      },
      err=>{
        console.log(err);

        // console.log('Formulaire soumis avec error', this.userForm.value);
        this.toastr.error(err.error.message, 'erreur')

      }
    )

  }

  regenerateOTPCode(){
    this.service.regenerateOtpCode(this.email).subscribe(
      res=>{
        console.log(res);
        
    //    this.router.navigate(['/verif/email/'+user.email]);
        
        this.toastr.success('a été envoyé avec succés','Code')

      },
      err=>{
        console.log(err);

        // console.log('Formulaire soumis avec error', this.userForm.value);
        this.toastr.error('', 'erreur')

      }
    )
  }
}
