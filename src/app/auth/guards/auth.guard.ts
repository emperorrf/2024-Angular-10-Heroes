import { inject, Injectable } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment, ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot  } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, tap } from 'rxjs';


@Injectable({providedIn: 'root'})
class AuthGuard {

  canActivate(): Observable<boolean> {
    console.log('Activated');
    return checkAuthStatus();
  }
  canMatch(): Observable<boolean> {
    console.log('Match');
    return checkAuthStatus();
  }
}

export const canActivateHeroes: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(AuthGuard).canActivate();
};

export const canMatchHeroes: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  return inject(AuthGuard).canMatch();
}

const checkAuthStatus = (): Observable<boolean> =>{
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap ( isAuthenticated => console.log('Authenticated Heroes: ', isAuthenticated)),
      tap( isAuthenticated  => {
        if (!isAuthenticated) router.navigate(['./auth/login']);
      })
      );
};
