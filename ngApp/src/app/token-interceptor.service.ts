import { Injectable,Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req:any, next:any){
    let authservice = this.injector.get(AuthserviceService)
    let tokenizeRequest = req.clone(
      {
        headers: req.headers.set('authorization', 'bearer ' + authservice.getToken())
      }
    )
    return next.handle(tokenizeRequest)
  }
}
