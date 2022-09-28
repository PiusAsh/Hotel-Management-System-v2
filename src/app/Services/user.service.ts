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
  constructor(private http: HttpClient) {}

  // login(username: string, password: string): Observable<any> {
  //   return this.http.post(this.baseApiUrl + 'signin', {
  //     username,
  //     password,
  //   });
  // }

  // GET BANK TRANSACTIONS METHOD
  // LoginUser(): any {
  //   return this.http
  //     .post(`${this.baseApiUrl}/Auth/Login`, JSON.stringify(any))
  //     .pipe(
  //       map((data) => {
  //         console.log(data);
  //         return data;
  //       })
  //     );
  Userlogin() {
    this.http.get<any>(this.baseApiUrl).subscribe(
      (res) => {

      }
    );
  }
  }
  

