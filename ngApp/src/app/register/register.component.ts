import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authservice:AuthserviceService,
    private _route:Router) { }
  registerUserData:any = {}
  ngOnInit(): void {
  }
  registerUser(){
    console.log(this.registerUserData)
    this.authservice.registerUser(this.registerUserData).subscribe(
      (res) => {
        localStorage.setItem('token',res.token)
        this._route.navigate(['/events'])
      },
      err => console.error(err)
    )
  }

}
