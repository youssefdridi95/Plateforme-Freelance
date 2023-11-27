import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Env } from '../env';
import { environments } from 'src/enviroments';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class talentGuard implements CanActivate {
    private env : Env

  constructor(private authService: AuthService, private router: Router,private toastr : ToastrService) {  
    this.env = environments as Env 
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.authService.getUser();

    if (!user) {
      return false;
    }

    const roles = user.roles;

    if (!roles.includes(this.env.roles.user)) {
      this.toastr.error("vous n'avez pas les droits pour accéder à cette page ",'stop')

    return this.router.createUrlTree(['access/denied/404']);

      return false;
    }

    return true;
  }
}


