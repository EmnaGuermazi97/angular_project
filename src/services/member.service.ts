import { Injectable } from '@angular/core';
import {GLOBAL} from '../app/app-config';
import {Member} from '../models/member.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Event} from '../models/event.model';
import {Publication} from '../models/publication.model';
import {Tool} from '../models/tool.model';




@Injectable({
  providedIn: 'root'
  // root means you don't gave to write it in any providers
  // provided in can take the values of any or platform
  // when we use any we have to write MemberService in providers
})
export class MemberService {
  private path = `${environment.gatewayEndpoint}/membre-service`;
  // @ts-ignore
  public placeholderMembers: Member[] = GLOBAL._DB.members;
  constructor(
    private httpClient: HttpClient,

  ) { }
  getAllMembers(): Promise<Member[]> {
    return this.httpClient.get<Member[]>(`${this.path}/membres`).toPromise();

  }
  getPublicationsByMemberId(id: string): Promise<Publication[]> {
    return this.httpClient.get<Publication[]>(`${this.path}/publications/member/${id}`).toPromise();

  }
  getEventsByMemberId(id: string): Promise<Event[]> {
    return this.httpClient.get<Event[]>(`${this.path}/events/member/${id}`).toPromise();
  }
  getToolsByMemberId(id: string): Promise<Tool[]> {
    return this.httpClient.get<Tool[]>(`${this.path}/tools/member/${id}`).toPromise();
  }

  getMemberById(id: string): Promise<Member> {
    return this.httpClient.get<Member>(`${this.path}/membres/${id}`).toPromise();
  }

  /**
   * create a new member or update an old member.
   * a new member doesn't have an id
   */
  saveMember(member: any): Promise<Member> {
    if (!!member.id) {
      return this.updateMember(member.id, member);
    } else {
      return this.createMember(member);
    }
  }

  createMember(member: any): Promise<Member> {
    return this.httpClient.post<Member>(`${this.path}/membres/add`, member).toPromise();
  }
  // createMemberStudent(member: any): Promise<Member> {
  //   return this.httpClient.post<Member>(`${this.path}/membres/etudiant`, member).toPromise();
  // }
  // createMemberProfessor(member: any): Promise<Member> {
  //   return this.httpClient.post<Member>(`${this.path}/membres/etudiant`, member).toPromise();
  // }
  updateMember(id: string, member: any): Promise<Member> {
    return this.httpClient.put<Member>(`${this.path}/membres/etudiant/${id}`, member).toPromise();
  }
  // updateMemberStudent(id: string, member: any): Promise<Member> {
  //   return this.httpClient.put<Member>(`${this.path}/membres/etudiant/${id}`, member).toPromise();
  // }
  // updateMemberProfessor(id: string, member: any): Promise<Member> {
  //   return this.httpClient.put<Member>(`${this.path}/membres/enseignant/${id}`, member).toPromise();
  // }
  removeMemberById(id: string): Promise<void> {
    // return this.httpClient.delete<void>('linkToRestApi').toPromise();
    this.placeholderMembers = this.placeholderMembers.filter(item => item.id !== id);
    return new Promise(resolve => resolve());
  }

}

