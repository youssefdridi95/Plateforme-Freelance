import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class loggedinGuard implements CanActivate{

constructor(private authService: AuthService, private router: Router,private toastr : ToastrService) {}

canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!sessionStorage.getItem('user')){
        
         return true;
   
  } else {
    this.toastr.error('already loggedin','user')
  
    return this.router.createUrlTree(['/']);
  }
}
}