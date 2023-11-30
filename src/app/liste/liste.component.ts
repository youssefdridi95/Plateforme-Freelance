import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntrepriseService } from '../services/entreprise.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {
  users: any[] | undefined ;
  userForm!: FormGroup;
  user:any;

  constructor(
    private formBuilder: FormBuilder,
    private enterpriseService: EntrepriseService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      role: ['', Validators.required],
    });
    
    // Assuming you want to load users when the component initializes
    this.route.params.subscribe(params => {
      const idEntreprise = params['idEntreprise'];
      if (idEntreprise) {
        this.getUsersByEntreprise(idEntreprise);
      }
    });

   this.getUsersByEntreprise(JSON.parse(sessionStorage.getItem('user')!).id)
  }

  isFormValid(): boolean {
    return this.userForm.valid;
  }

  add() {
    let userId = JSON.parse(sessionStorage.getItem('user')!).id;

    if (this.userForm.valid) {
      const { email, role } = this.userForm.value;
      this.enterpriseService.addUser({
        "idEntreprise": userId,
        "email": email,
        "role" : role
      }).subscribe(
        res => {
          console.log(res);
          this.toastr.success('Invitation envoyée', 'Compte');
          // After adding the user, refresh the user list
          this.getUsersByEntreprise(userId);
        },
        err => {
          console.log(err);
          this.toastr.error(err.error.message, 'Erreur');
        }
      );

      this.userForm.reset();
    }
  }

  getUsersByEntreprise(idEntreprise: string) {
    this.enterpriseService.getByEntreprise(idEntreprise).subscribe(
      (data: any) => {
        this.users = data; // Assuming the API returns an array of users
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }
  

  delete(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
        this.enterpriseService.deleteUser(userId).subscribe(
            () => {
                this.toastr.success('User deleted successfully', 'Success');
                // After deleting the user, refresh the user list
                const idEntreprise = JSON.parse(sessionStorage.getItem('user')!).id;
                this.getUsersByEntreprise(idEntreprise);
            },
            (err) => {
                console.log(err);
                this.toastr.error('Error deleting user', 'Error');
            }
        );
    }
}

}
