import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private router:Router){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean{
      const token=localStorage.getItem('mytoken');

      if(token)
        return true;
      else{
        this.router.navigateByUrl('/login')
        return false
      }
  }
  
}
