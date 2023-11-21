import { Component } from '@angular/core';
import { MotdepasseService } from '../services/motdepasse.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recup-mdp',
  templateUrl: './recup-mdp.component.html',
  styleUrls: ['./recup-mdp.component.css']
})
export class RecupMDPComponent {
  reset :any
  role:any
  pwdForm !:FormGroup
  constructor(private route: ActivatedRoute,private formBuilder:FormBuilder,private toastr : ToastrService,private  mdp : MotdepasseService,private router: Router,private  mdpService : MotdepasseService ) {
    this.route.paramMap.subscribe(params => { 
      this.reset= params.get('reset') ;
      this.role= params.get('role') ;
    }) ;

  };
isMush=true
  changePswword() {
    if (this.pwdForm.get('password')!.value === this.pwdForm.get('confirmPwd')!.value) {
      this.isMush =true
    } else {
      this.isMush = false;
    }

  
if (this.isMush )
   {
  
    this.mdpService.changeMdp(this.reset,this.pwdForm.get('password')!.value).subscribe(
      res=>{
      
        
        this.toastr.success('a été changé avec succés','Mot de passe')
        if(this.role==='talent')
         this.navigateToPage('/user/connexion/signin', 1500)
        else
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

  ngOnInit (): void {
  this.pwdForm = this.formBuilder.group({
    email:['',[Validators.minLength(5),Validators.required]],
    password:['',[Validators.required,Validators.minLength(6)]],
    confirmPwd:['',[Validators.required,Validators.minLength(6)]],
  }
  
   )}


   navigateToPage(root: string, time:number=0) {
    // Adjust route paths based on the values passed in the HTML


    // Add a delay of 1000 milliseconds (1 second)
    setTimeout(() => {
      this.router.navigate([root]);
    }, time);
  }
 
}
