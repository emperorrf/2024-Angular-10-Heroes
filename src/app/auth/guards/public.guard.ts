import { inject, Injectable } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment, ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot  } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable, tap } from 'rxjs';


@Injectable({providedIn: 'root'})
class PublicGuard {

  canActivate(): Observable<boolean> {
    console.log('Activated');
    return checkAuthStatus();
  }
  canMatch(): Observable<boolean> {
    console.log('Match');
    return checkAuthStatus();
  }
}

export const canActivateLogin: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(PublicGuard).canActivate();
};

export const canMatchLogin: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  return inject(PublicGuard).canMatch();
}

const checkAuthStatus = (): Observable<boolean> =>{
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap ( isAuthenticated => console.log('Authenticated Login: ', isAuthenticated)),
      map( authenticated => !authenticated),
      tap( authenticated  => {
        if (!authenticated) router.navigate(['./']);
      })
      );
};
