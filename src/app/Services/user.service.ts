import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseApiUrl: string = environment.baseApiUrl;

  

  constructor(private http: HttpClient) {}

  Register(register: User): Observable<User> {
    return this.http.post<User>(this.baseApiUrl + '/Auth/Register', register);
  }

  register(user: User) {
    return this.http.post(`${this.baseApiUrl}/Auth/Register`, user);
  }

  LoginUser(login: User): Observable<User> {
    return this.http.post<User>(this.baseApiUrl + '/Auth/Login', login);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseApiUrl + '/Auth/RegisteredUsers');
  }

  DeleteUser(id: User): Observable<any> {
    return this.http.delete<any>(this.baseApiUrl + '/Auth/DeleteUser/' + id);
  }

  updateUser(id: any, update: User): Observable<User> {
    return this.http.put<User>(
      this.baseApiUrl + '/Auth/UpdateUser/' + id,
      update
    );
  }

  getUserById(id: any): Observable<User>{
    return this.http
      .get<User>(this.baseApiUrl + '/Auth/GetUserById?Id=' + id)
      .pipe(
        map((data) => {
          return data;
        }),
        tap((res) => console.log(JSON.stringify(res)))
      );
  }
}
  

