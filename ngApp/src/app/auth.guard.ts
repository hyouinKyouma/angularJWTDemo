import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _auth:AuthserviceService,
    private _route:Router
  ){}
  canActivate(): boolean{
    if(this._auth.loggedin()){
      return true
    }else{
      this._route.navigate(['/login'])
      return false
    }
  }
  
}
