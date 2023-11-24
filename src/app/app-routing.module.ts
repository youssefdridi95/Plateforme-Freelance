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
import { RecupMDPComponent } from './recup-mdp/recup-mdp.component';
import { AuthGuard } from './guard/auth-gard.guard';
import { loggedinGuard } from './guard/loggedin.guard';
import { AddPostComponent } from './add-post/add-post.component';
import { HomeComponent } from './home/home.component';
import { AccueilComponent } from './accueil/accueil.component';
import { talentGuard } from './guard/user_guard';
import { VerifEmailComponent } from './verif-email/verif-email.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ListeEmpComponent } from './liste-emp/liste-emp.component';
import { ListeComponent } from './liste/liste.component';
const routes: Routes = [


  {path : "user/connexion/:type" , component : UserInscritComponent ,canActivate:[loggedinGuard]},

  {path:"entreprise/listee",component :ListeEmpComponent },
  {path:"entreprise/liste",component :ListeComponent },

  {path:"",component :HomeComponent },
  {path:"accueil",component :AccueilComponent },
  {path : "user/connexion/:type" , component : UserInscritComponent },
  {path:"profil/entreprise",component :ProfilEntrepriseComponent },
  {path:"entreprise/profil",component :ProfilEntrepriseComponent},

  {path:"entreprise/connexion/:type",component :LoginEntrepriseComponent,canActivate:[loggedinGuard] },
  {path:"entreprise/creation",component :CreationEntrepriseComponent , canActivate: [AuthGuard]},
  {path:"changeMdp/:role/:reset",component :RecupMDPComponent},
  {path:"mdp",component :MdpComponent},
  {path:"role",component :RoleComponent ,canActivate:[loggedinGuard] },
  {path:"cv/creer",component :CvBuilderComponent , canActivate: [AuthGuard] },
  {path:":id/cv/edit",component :CvUpdateComponent , canActivate: [AuthGuard] },
  {path:"cv/afficher",component :CvPreviewComponent , canActivate: [AuthGuard]},
  {path: "user/profil", component : ProfilComponent , canActivate: [AuthGuard,talentGuard]},
  {path: "user/compte", component : UserCompteComponent },
  {path: "user/form" , component : UserFormComponent , canActivate: [AuthGuard]},
  {path: "user/profile/create" , component : UserFormComponent},
  {path: "verif/email/:role/:email" , component : VerifEmailComponent},

  {
    path: 'post',
 // this is the component with the <router-outlet> in the template
    children: [
      {path: "add" , component : AddPostComponent},
      {path: "edit" , component : EditPostComponent},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
