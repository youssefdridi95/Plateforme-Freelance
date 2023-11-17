import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilEntrepriseComponent } from './profil-entreprise/profil-entreprise.component';
import { LoginEntrepriseComponent } from './login-entreprise/login-entreprise.component';
import { CreationEntrepriseComponent } from './creation-entreprise/creation-entreprise.component';
import { CvBuilderComponent } from './cv-builder/cv-builder.component';
import { UserInscritComponent } from './user-inscrit/user-inscrit.component';
import { CvPreviewComponent } from './cv-preview/cv-preview.component';
import { CvUpdateComponent } from './cv-update/cv-update.component';
import { MdpComponent } from './mdp/mdp.component';
import { UserCompteComponent } from './user-compte/user-compte.component';
import { ProfilComponent } from './profil/profil.component';
import { RoleComponent } from './role/role.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  {path:"",component :RoleComponent },

  {path : "user/connexion/:type" , component : UserInscritComponent },
  {path:"profil/entreprise",component :ProfilEntrepriseComponent},

  {path:"entreprise/profil",component :ProfilEntrepriseComponent},

  {path:"entreprise/connexion/:type",component :LoginEntrepriseComponent},
  {path:"entreprise/creation",component :CreationEntrepriseComponent},



  {path:"mdp",component :MdpComponent},
  {path:"role",component :RoleComponent },
  {path:"cv/creer",component :CvBuilderComponent },
  {path:":id/cv/edit",component :CvUpdateComponent },
  {path:"cv/afficher",component :CvPreviewComponent },

  {path: "user/compte", component : ProfilComponent},
  {path: "user/profil", component : UserCompteComponent},
  {path: "user/form" , component : UserFormComponent},
  {path :"user/connexion", component : UserInscritComponent },
  {path : "user/connexion/:type" , component : UserInscritComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
