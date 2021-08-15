import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http:HttpClient) { }

  private _eventURL = 'http://localhost:3000/events'
  private _specialURL = 'http://localhost:3000/special'

  getEvents(){
    return this.http.get<any>(this._eventURL)
  }

  getSpecials(){
    return this.http.get<any>(this._specialURL)
  }
}