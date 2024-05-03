import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private userType: any;
  constructor(private localstorage: LocalStorageService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.localstorage.getCurrentUser('current') === true) {
      this.userType = this.localstorage.userJson['type'];
      if (this.userType === 'user') return true;
      if (this.userType === 'admin') return true;
    }
    else {
      this.router.navigate(['/']);
      return false;
    }
    throw new Error('Method not implemented.');
  }

}