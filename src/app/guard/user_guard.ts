import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Env } from '../env';
import { environments } from 'src/enviroments';

@Injectable({
  providedIn: 'root'
})
export class talentGuard implements CanActivate {
    private env : Env

  constructor(private authService: AuthService, private router: Router) {  this.env = environments as Env 
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
      alert('You need to be a talent to access this page.');
      this.authService.navigate(['/']);
      return false;
    }

    return true;
  }
}


