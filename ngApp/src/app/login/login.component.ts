import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthserviceService,
    private _route:Router) { }
  loginUserData:any = {}
  ngOnInit(): void {
  }
  loginUser(){
    this.authService.loginUser(this.loginUserData).subscribe(
      res => {
        localStorage.setItem('token',res.token)
        this._route.navigate(['/events'])
      },
      err => console.error(err)
    )

  }

}
