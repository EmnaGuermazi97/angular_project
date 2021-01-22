import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {Event} from '../models/event.model';
import {HttpClient} from '@angular/common/http';
import {GLOBAL} from '../app/app-config';
import {Publication} from '../models/publication.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private path = `${environment.gatewayEndpoint}/evenement-service`;
  public placeholderEvents: Event[] = GLOBAL._DB.events;

  constructor(private httpClient: HttpClient) {}
  getAllEvents(): Promise<Event[]> {
    return this.httpClient.get<Event[]>(`${this.path}/events`).toPromise();

  }

  getEventById(id: string): Promise<Event> {
    return this.httpClient.get<Event>(`${this.path}/events/${id}`).toPromise();
  }
  getEventByTitle(title: string): Promise<Event> {
    return this.httpClient.get<Event>(`${this.path}/events/find/${title}`).toPromise();
  }

  /**
   * create a new member or update an old member.
   * a new member doesn't have an id
   */
  saveEvent(event: any): Promise<Event> {
    if (!!event.id) {
      return this.updateEvent(event.id, event);
    } else {
      return this.createEvent(event);
    }
  }

  createEvent(event: any): Promise<Event> {
    return this.httpClient.post<Event>(`${this.path}/events/add`, event).toPromise();
  }

  updateEvent(id: string, event: any): Promise<Event> {
    return this.httpClient.put<Event>(`${this.path}/events/update/${id}`, event).toPromise();
  }
  removeEventById(id: string): Promise<void> {
     return this.httpClient.delete<void>(`${this.path}/events/delete/${id}`).toPromise();
    // this.placeholderEvents = this.placeholderEvents.filter(item => item.id !== id);
    // return new Promise(resolve => resolve());
  }
}
