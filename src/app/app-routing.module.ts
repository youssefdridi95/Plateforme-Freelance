import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilEntrepriseComponent } from './profil-entreprise/profil-entreprise.component';
import { SignupEntrepriseComponent } from './signup-entreprise/signup-entreprise.component';
import { LoginEntrepriseComponent } from './login-entreprise/login-entreprise.component';
import { CreationEntrepriseComponent } from './creation-entreprise/creation-entreprise.component';
import { CvBuilderComponent } from './cv-builder/cv-builder.component';
import { UserSignComponent } from './user-sign/user-sign.component';
import { UserInscritComponent } from './user-inscrit/user-inscrit.component';
import { CvPreviewComponent } from './cv-preview/cv-preview.component';
import { CvUpdateComponent } from './cv-update/cv-update.component';

const routes: Routes = [
   {path : "user/connexion" , component : UserSignComponent},
  {path : "user/register" , component : UserInscritComponent },
 
  {path:"profil_entreprise",component :ProfilEntrepriseComponent},
  {path:"signup_entreprise",component :SignupEntrepriseComponent},
  {path:"login_entreprise",component :LoginEntrepriseComponent},
  {path:"creation_entreprise",component :CreationEntrepriseComponent},

  
  {path:"cv/creer",component :CvBuilderComponent },
  {path:":id/cv/edit",component :CvUpdateComponent },
  {path:"cv/afficher",component :CvPreviewComponent },

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
