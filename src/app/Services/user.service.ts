import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseApiUrl: string = environment.baseApiUrl;

  MyHeader = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'application/json',
      'Access-Control-Allow-Origin': this.baseApiUrl,
    },
  };

  constructor(private http: HttpClient) {}

  LoginUser(login: User): Observable<User> {
    return this.http.post<User>(this.baseApiUrl + '/Auth/Login', login);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseApiUrl + '/Auth/RegisteredUsers');
  }
  
}
  

