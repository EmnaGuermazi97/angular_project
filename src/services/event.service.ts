import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {Event} from '../models/event.model';
import {HttpClient} from '@angular/common/http';
import {GLOBAL} from '../app/app-config';

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

  createEvent(member: any): Promise<Event> {
    return this.httpClient.post<Event>(`${this.path}/membres/etudiant`, member).toPromise();
  }

  updateEvent(id: string, member: any): Promise<Event> {
    return this.httpClient.put<Event>(`${this.path}/membres/etudiant/${id}`, member).toPromise();
  }
  removeEventById(id: string): Promise<void> {
    // return this.httpClient.delete<void>('linkToRestApi').toPromise();
    this.placeholderEvents = this.placeholderEvents.filter(item => item.id !== id);
    return new Promise(resolve => resolve());
  }
}
