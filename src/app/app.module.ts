import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginEntrepriseComponent } from './login-entreprise/login-entreprise.component';
import { SignupEntrepriseComponent } from './signup-entreprise/signup-entreprise.component';
import { ProfilEntrepriseComponent } from './profil-entreprise/profil-entreprise.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CvBuilderComponent } from './cv-builder/cv-builder.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,  
     LoginEntrepriseComponent,
    SignupEntrepriseComponent,
    ProfilEntrepriseComponent,
    CvBuilderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
