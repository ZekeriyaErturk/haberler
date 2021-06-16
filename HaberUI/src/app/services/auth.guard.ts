import { ApiService } from 'src/app/services/api.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public apiServis: ApiService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const login = localStorage.getItem('login');
    const roller = next.data['roller'] as String[];
    if (!login || !roller || !roller.length) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
