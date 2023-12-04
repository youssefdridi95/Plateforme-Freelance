import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Env } from '../env';
import { environments } from 'src/enviroments';



@Injectable({
  providedIn: 'root'
})
export class loggedinGuard implements CanActivate{

constructor(private authService: AuthService, private router: Router,private toastr : ToastrService) {}
env :Env =environments as Env

canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!sessionStorage.getItem('user')){
         return true;
   
  } else  {
    this.toastr.info('already loggedin','user')

    if (JSON.parse(sessionStorage.getItem('user')!).roles.includes(this.env.roles.entAdmin) ||
         JSON.parse(sessionStorage.getItem('user')!).roles.includes(this.env.roles.entRecruter || 
          JSON.parse(sessionStorage.getItem('user')!).roles.includes(this.env.roles.entEditor)) ) {
      
            return this.router.createUrlTree(['/entreprise/profil',JSON.parse(sessionStorage.getItem('user')!).id]);
    }
   else if (JSON.parse(sessionStorage.getItem('user')!).roles.includes(this.env.roles.user)  ) {
          return this.router.createUrlTree(['/user/compte',JSON.parse(sessionStorage.getItem('user')!).id]);
}
    else 
    sessionStorage.removeItem('user')
    return this.router.createUrlTree(['/']);
    
  }
}
}