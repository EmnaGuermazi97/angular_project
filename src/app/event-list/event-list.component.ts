import { Component, OnInit } from '@angular/core';
import {Event} from '../../models/event.model';
import {EventService} from '../../services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'date', 'location', 'actions'];
  dataSource: Event[] = []; // empty then it would be filled

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.fetchDataSource();

  }

  fetchDataSource(): void {
    this.eventService.getAllEvents().then(data => {
      this.dataSource = data;
    });  }
  onRemoveAccount(id: any): void {
    this.eventService.removeEventById(id).then(() => this.fetchDataSource());

  }
}
