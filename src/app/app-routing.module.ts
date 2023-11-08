import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInscritComponent } from './user-inscrit/user-inscrit.component';
import { UserSignComponent } from './user-sign/user-sign.component';


import { ProfilEntrepriseComponent } from './profil-entreprise/profil-entreprise.component';
import { SignupEntrepriseComponent } from './signup-entreprise/signup-entreprise.component';
import { LoginEntrepriseComponent } from './login-entreprise/login-entreprise.component';
import { CvBuilderComponent } from './cv-builder/cv-builder.component';

const routes: Routes = [
  {path : "user/connexion" , component : UserSignComponent},
  {path : "user/register" , component : UserInscritComponent },
  {path : '', component : UserInscritComponent},
  {path:"profil_entreprise",component :ProfilEntrepriseComponent},
  {path:"signup_entreprise",component :SignupEntrepriseComponent},
  {path:"login_entreprise",component :LoginEntrepriseComponent},
  {path:"cv/creer",component :CvBuilderComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
