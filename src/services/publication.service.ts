import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {Publication} from '../models/Publication.model';
import {GLOBAL} from '../app/app-config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private path = `${environment.gatewayEndpoint}/publication-service`;
  // @ts-ignore
  public placeholderPublications: Publication[] = GLOBAL._DB.publications;
  constructor(private httpClient: HttpClient) { }
  getAllPublications(): Promise<Publication[]> {
    return this.httpClient.get<Publication[]>(`${this.path}/publications`).toPromise();

  }

  getPublicationById(id: string): Promise<Publication> {
    return this.httpClient.get<Publication>(`${this.path}/publications/${id}`).toPromise();
  }
  getPublicationByTitle(title: string): Promise<Publication> {
    return this.httpClient.get<Publication>(`${this.path}/publications/find/${title}`).toPromise();
  }
  /**
   * create a new Publication or update an old Publication.
   * a new Publication doesn't have an id
   */
  savePublication(publication: any): Promise<Publication> {
    if (!!publication.id) {
      return this.updatePublication(publication.id, publication);
    } else {
      return this.createPublication(publication);
    }
  }

  createPublication(publication: any): Promise<Publication> {
    return this.httpClient.post<Publication>(`${this.path}/publications/add`, publication).toPromise();
  }

  updatePublication(id: string, publication: any): Promise<Publication> {
    return this.httpClient.put<Publication>(`${this.path}/publications/update/${id}`, publication).toPromise();
  }
  removePublicationById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`${this.path}/publications/delete/${id}`).toPromise();
    // this.placeholderPublications = this.placeholderPublications.filter(item => item.id !== id);
    // return new Promise(resolve => resolve());
  }
}
