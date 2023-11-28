import { Component } from '@angular/core';
// Corrected import path
import { Env } from '../env';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntrepriseService } from '../services/entreprise.service';
import { ToastrService } from 'ngx-toastr';
import { environments } from 'src/enviroments';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userenForm!: FormGroup;
  env: Env = environments as Env;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private entrepriseService: EntrepriseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userenForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPwd: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  isMush = true;

  add() {
    this.route.params.subscribe(params => {
      const role = params['role'];
      const email = params['email'];
      const idEntreprise = params['idEntreprise'];
      console.log(email);

      // Additional logic related to route parameters can be added here
    

    if (this.userenForm.get('password')!.value === this.userenForm.get('confirmPwd')!.value) {
      this.isMush = true;
    } else {
      this.isMush = false;
    }
  
    if (this.isMush) {
      const userEntreprise = {
        'username': this.userenForm.value.username,
        'password': this.userenForm.value.password,
        "idEntreprise": idEntreprise,
        "email": email,
        "role": role
      };
      console.log(userEntreprise);

      this.entrepriseService.add(userEntreprise).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/entreprise/connexion/login']);
          this.toastr.success('a été créé avec succès', 'compte');
        },
        err => {
          console.log(err);
          this.toastr.error(err.error.message, 'erreur');
        }
      );
    } else {
      this.toastr.error('Valider votre formulaire', '');
    }
  });
  }

  navigateToPage(root: string, time: number = 0) {
    setTimeout(() => {
      this.router.navigate([root]);
    }, time);
  }
}
