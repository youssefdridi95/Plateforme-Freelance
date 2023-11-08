import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInscritComponent } from './user-inscrit/user-inscrit.component';
import { UserSignComponent } from './user-sign/user-sign.component';

const routes: Routes = [
  {path : "user/connexion" , component : UserSignComponent},
  {path : "user/register" , component : UserInscritComponent },
  {path : '', component : UserInscritComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
