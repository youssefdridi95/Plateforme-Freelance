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
import { AccessDenied403Component } from './access-denied403/access-denied403.component';
import { NotFound404Component } from './not-found404/not-found404.component';
import { SectionComponent } from './section/section.component';
import { AddUserComponent } from './add-user/add-user.component';
import { RechercheComponent } from './recherche/recherche.component';
import { EntrepriseupdateComponent } from './entrepriseupdate/entrepriseupdate.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { TalentFeedComponent } from './talent-feed/talent-feed.component';
import { EntrepriseFeedComponent } from './entreprise-feed/entreprise-feed.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChatsComponent } from './chats/chats.component';


const routes: Routes = [


  {path : "user/connexion/:type" , component : UserInscritComponent ,canActivate:[loggedinGuard]},
  {path:"section",component :SectionComponent },
  {path:"CreerCompteEmployee/:email/:idEntreprise/:role",component :AddUserComponent },
  {path:"recherche",component :RechercheComponent },

  {path:"talents/list/:skill",component :ListeEmpComponent,canActivate: [AuthGuard] },
  {path:"entreprise/feed/:skill",component:EntrepriseFeedComponent ,canActivate: [AuthGuard]},
  {path:"entreprise/liste",component :ListeComponent , canActivate: [AuthGuard]},

  {path:"entreprise/update",component :EntrepriseupdateComponent ,canActivate: [AuthGuard]},
  {path:"",component :HomeComponent ,canActivate:[loggedinGuard]},
  {path:"accueil",component :AccueilComponent },
  {path:"profil/entreprise",component :ProfilEntrepriseComponent,canActivate: [AuthGuard] },
  {path:"entreprise/profil/:id",component :ProfilEntrepriseComponent,canActivate: [AuthGuard]},

  {path:"entreprise/connexion/:type",component :LoginEntrepriseComponent,canActivate:[loggedinGuard] },
  {path:"entreprise/creation",component :CreationEntrepriseComponent,canActivate: [AuthGuard]},
  {path:"changeMdp/:role/:reset",component :RecupMDPComponent},
  {path:"mdp",component :MdpComponent},
  {path:"role",component :RoleComponent ,canActivate:[loggedinGuard] },
  {path:"cv/creer",component :CvBuilderComponent,canActivate: [AuthGuard] },
  {path:"cv/edit",component :CvUpdateComponent , canActivate: [AuthGuard] },
  {path:"cv/afficher",component :CvPreviewComponent },
  {path: "user/profil", component : ProfilComponent },
  {path: "user/compte/:id", component : UserCompteComponent, canActivate: [AuthGuard] },
  {path: "user/form" , component : UserFormComponent , canActivate: [AuthGuard]},
  {path: "user/profile/create" , component : UserFormComponent,canActivate: [AuthGuard]},
  {path: "verif/email/:role/:email" , component : VerifEmailComponent},
  {path: "user/update", component :UserUpdateComponent,canActivate: [AuthGuard]},
  {path: "dashboard" , component : DashboardComponent},
  {path: "chat", component :ChatsComponent,},
  {path: "id/:activeId" , component : ChatsComponent},




  {
    path: 'post', canActivate: [AuthGuard] ,
 // this is the component with the <router-outlet> in the template
    children: [
      {path: "add" , component : AddPostComponent},
      {path: "edit/:idPost" , component : EditPostComponent},
      {path: "feed" , component : TalentFeedComponent},
    ]
  },
  {path: "access/denied/404" , component : AccessDenied403Component},
  {path: "**" , component : NotFound404Component},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
