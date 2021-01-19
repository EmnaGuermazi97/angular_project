import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Member} from '../models/member.model';


const AUTH_API = 'http://localhost:9998/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }
  addUser(user): Observable<any> {
    return this.http.post(AUTH_API + 'user/add', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }
  updateUser(id: string, member: Member): Observable<any> {
    return this.http.put(AUTH_API + `user/update/${id}`, {
      email: member.email,
      password: member.password
    }, httpOptions);
  }
}
