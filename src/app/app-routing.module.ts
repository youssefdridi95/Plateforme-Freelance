import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilEntrepriseComponent } from './profil-entreprise/profil-entreprise.component';
import { LoginEntrepriseComponent } from './login-entreprise/login-entreprise.component';
import { CreationEntrepriseComponent } from './creation-entreprise/creation-entreprise.component';
import { CvBuilderComponent } from './cv-builder/cv-builder.component';
import { UserSignComponent } from './user-sign/user-sign.component';
import { UserInscritComponent } from './user-inscrit/user-inscrit.component';
import { MdpComponent } from './mdp/mdp.component';

const routes: Routes = [
   {path : "user/connexion" , component : UserSignComponent},
  {path : "user/register" , component : UserInscritComponent },
  {path:"profil/entreprise",component :ProfilEntrepriseComponent},
  {path:"login/entreprise",component :LoginEntrepriseComponent},
  {path:"creation/entreprise",component :CreationEntrepriseComponent},
  {path:"mdp",component :MdpComponent},
  {path:"cv/creer",component :CvBuilderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
