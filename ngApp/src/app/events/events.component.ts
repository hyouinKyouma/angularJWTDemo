import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private eventService:EventsService) { }

  events:any = []
  ngOnInit(): void {
    this.eventService.getEvents().subscribe(
      res => this.events = res,
      err => console.error(err)
    )
  }

}
