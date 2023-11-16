// import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  form!: FormGroup;

  constructor() {
    this.form = new FormGroup(
      {
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
    const storedUsername = sessionStorage.getItem('username');
    const storedEmail = sessionStorage.getItem('useremail');
  
    // Assurez-vous que la valeur n'est pas null avant de l'assigner
    this.username = storedUsername ?JSON.parse (storedUsername) : '';
    this.email = storedEmail ? JSON.parse (storedEmail) : '';
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
  
}
