import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilEntrepriseComponent } from './profil-entreprise/profil-entreprise.component';
import { SignupEntrepriseComponent } from './signup-entreprise/signup-entreprise.component';
import { LoginEntrepriseComponent } from './login-entreprise/login-entreprise.component';

const routes: Routes = [
  {path:"profil_entreprise",component :ProfilEntrepriseComponent},
  {path:"signup_entreprise",component :SignupEntrepriseComponent},
  {path:"login_entreprise",component :LoginEntrepriseComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
