import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http'
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';

import { UserInscritComponent } from './user-inscrit/user-inscrit.component';
import { ProfilComponent } from './profil/profil.component'; 
import { UserCompteComponent } from './user-compte/user-compte.component';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginEntrepriseComponent } from './login-entreprise/login-entreprise.component';
import { ProfilEntrepriseComponent } from './profil-entreprise/profil-entreprise.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CvBuilderComponent } from './cv-builder/cv-builder.component';
import { CreationEntrepriseComponent } from './creation-entreprise/creation-entreprise.component';
import { CvPreviewComponent } from './cv-preview/cv-preview.component';
import { CvUpdateComponent } from './cv-update/cv-update.component';
import { MdpComponent } from './mdp/mdp.component';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { RoleComponent } from './role/role.component';
@NgModule({
  declarations: [
    AppComponent,
    UserInscritComponent,
    NavbarComponent,
    FooterComponent,  
    LoginEntrepriseComponent,
    ProfilEntrepriseComponent,
    CvBuilderComponent,
    CreationEntrepriseComponent,
    CvPreviewComponent,
    CvUpdateComponent,
    MdpComponent,
    DialogBodyComponent,
    ProfilComponent,

    RoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    CommonModule,

     // required animations module
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      closeButton : true

    }), // ToastrModule added
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
