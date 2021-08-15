import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  constructor(private eventService: EventsService, private _router:Router) { }

  specials:any = []
  ngOnInit(): void {
    this.eventService.getSpecials().subscribe(
      res => this.specials = res,
      err => {
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this._router.navigate(['/login'])
          }
        }
      }
    )
  }

}
