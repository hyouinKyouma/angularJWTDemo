import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private _registerURL = `http://localhost:3000/register`
  private _loginURL = `http://localhost:3000/login`
  constructor(private http:HttpClient,
    private _router: Router) { }

  registerUser(user: any){
    return this.http.post<any>(this._registerURL,user)
  }

  loginUser(user: any){
    return this.http.post<any>(this._loginURL,user)
  }
  // if token exists in the browser returns true else false
  loggedin(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/events'])
  }
}
