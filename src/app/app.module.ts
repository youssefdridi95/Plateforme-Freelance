import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserSignComponent } from './user-sign/user-sign.component';
import { UserInscritComponent } from './user-inscrit/user-inscrit.component';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginEntrepriseComponent } from './login-entreprise/login-entreprise.component';
import { SignupEntrepriseComponent } from './signup-entreprise/signup-entreprise.component';
import { ProfilEntrepriseComponent } from './profil-entreprise/profil-entreprise.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CvBuilderComponent } from './cv-builder/cv-builder.component';
import { CreationEntrepriseComponent } from './creation-entreprise/creation-entreprise.component';
import { MdpComponent } from './mdp/mdp.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    UserSignComponent,
    UserInscritComponent,
    NavbarComponent,
    FooterComponent,  
     LoginEntrepriseComponent,
    SignupEntrepriseComponent,
    ProfilEntrepriseComponent,
    CvBuilderComponent,
    CreationEntrepriseComponent,
    MdpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
