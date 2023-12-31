import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { UserInscritComponent } from './user-inscrit/user-inscrit.component';
import { ProfilComponent } from './profil/profil.component'; 
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
import { RecupMDPComponent } from './recup-mdp/recup-mdp.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ProfComponent } from './prof/prof.component';
import { AuthGuard } from './guard/auth-gard.guard';
import { loggedinGuard } from './guard/loggedin.guard';
import { AddPostComponent } from './add-post/add-post.component';
import { HomeComponent } from './home/home.component';
import { talentGuard } from './guard/user_guard';
import { VerifEmailComponent } from './verif-email/verif-email.component';
import { UserCompteComponent } from './user-compte/user-compte.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ListeEmpComponent } from './liste-emp/liste-emp.component';
import { ListeComponent } from './liste/liste.component';
import { AccessDenied403Component } from './access-denied403/access-denied403.component';
import { NotFound404Component } from './not-found404/not-found404.component';
import { SectionComponent } from './section/section.component';
import { AddUserComponent } from './add-user/add-user.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { Section2Component } from './section2/section2.component';
import { EntrepriseupdateComponent } from './entrepriseupdate/entrepriseupdate.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { RechercheComponent } from './recherche/recherche.component';
import { TalentFeedComponent } from './talent-feed/talent-feed.component';
import { EntrepriseFeedComponent } from './entreprise-feed/entreprise-feed.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChatsComponent } from './chats/chats.component';
import { ChatsService } from './services/chats.service';
import { rxStompServiceFactory } from './rx-stomp-service-factory';
import { RxStompService } from './rx-stomp.service';
import { NotificationMessageListService } from './notification-message-list.service';


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
    RoleComponent,
    RecupMDPComponent,
    UserFormComponent,
    ProfComponent,
    AddPostComponent,
    HomeComponent,
    VerifEmailComponent,
    UserCompteComponent,
    EditPostComponent,
    ListeEmpComponent,
    ListeComponent,
    AccessDenied403Component,
    NotFound404Component,
    SectionComponent,
    AddUserComponent,
    UserUpdateComponent,
    EntrepriseupdateComponent,
    RechercheComponent,
    TalentFeedComponent,
    EntrepriseFeedComponent,
    DashboardComponent,
    ChatsComponent
   

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    BrowserAnimationsModule,
   
    CommonModule,
    NgSelectModule,
     // required animations module
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      closeButton : true
    }), // ToastrModule added
    
  ],
  providers: [
    AuthGuard,
    loggedinGuard,
    talentGuard,
    NotificationMessageListService,
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
    },
    ChatsService,  // Add this line if not already there
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
