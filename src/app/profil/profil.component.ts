// import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserProfil } from '../services/user-profil';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  profil: any

  form!: FormGroup;

  constructor(private toastr : ToastrService, private router: Router, private userProfilService: UserProfil) {
    const userString = sessionStorage.getItem('profil');
  console.log(this.profil);
  

    this.form = new FormGroup(
      {
        // email: new FormControl(this.profil.prenom, [Validators.required]),

        new_password: new FormControl('', [Validators.required]),
        confirm_password: new FormControl('', [Validators.required]),
      },
      {
        validators: this.passwordMatchValidator, // Utilisez 'validators' au lieu de 'Validators'
      }
    );
    
  }

  passwordMatchValidator(control: AbstractControl) {
    return control.get('new_password')?.value === control.get('confirm_password')?.value
      ? null
      : { mismatch: true };
  }
   button = false ;
  popup = false;
  username: string = '';
  email: string = '';

  ngOnInit() {
    // Récupérer le nom d'utilisateur et l'e-mail depuis le sessionStorage


    // Assurez-vous que la valeur n'est pas null avant de l'assigner
    this.email = JSON.parse ( sessionStorage.getItem('user')!).email ;
    this.username =  JSON.parse ( sessionStorage.getItem('user')!).username ;

  }
  

  url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHzl1DW0w9lJrVWAMzVhAzg-ZSd-L0QiAGOoqtP58&s";

  onFileChange(e: any) {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        // If you have a local file, you can use FileReader.
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event: any) => {
          this.url = event.target.result;
        };
      } else {
        // If no local file, you can directly set the URL.
        this.url = "https://new-image-url.com"; // Replace with the new URL.
      }
    }
  }

  enableEdit(fieldName: string): void {
    const element = document.getElementById(fieldName) as HTMLInputElement;
    if (element) {
      element.readOnly = false;
      element.focus();
    }
  }
  toggleButtonAndEdit(fieldName: string): void {
    this.enableEdit(fieldName);
    this.toggleButton();
  }
  
  toggleButton(): void {
    this.button = !this.button;
  }

  editPassword (){

    if (this.form.valid) {
      const params = new HttpParams()
      .set('username',this.username)
      .set('newPassword', this.form.value.new_password);
console.log(params);

  //     const form = {
  // 'username ' : this.username,
  //     'newPassword' : this.form.value.new_password ,
  //     // 'prenom' : this.form.value.confirm_password ,
  //     // 'timezone' : this.form.value.timezone ,
  //   }
  
    this.userProfilService.editpassword(params).subscribe(

      res=>{
        console.log(res);
        this.popup=false
        // this.router.navigate(['/user/compte/',this.profil.id]);
        
        this.toastr.success('modification avec succes')
  
      },
      err=>{
        console.log(err);
        this.toastr.error(err.error.message[0], 'erreur de modification')
  
    // console.log('Formulaire soumis avec error', this.userForm.value);
    // this.toastr.error(err.error.message[0], 'Connexion')
  
      }
    )}
  
  }
}
