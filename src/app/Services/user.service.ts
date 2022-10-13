import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserLogin } from '../Models/ILogin';
import { Room } from '../Models/room';
import { User } from '../Models/user';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseApiUrl: string = environment.baseApiUrl;
  globalUser: any;
  public UserKey: string = 'User';
  userDetails: any;

  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public  userObservable!: Observable<User>;

  constructor(private http: HttpClient, private cartService: CartService, private router: Router, private toast: NgToastService) {
    this.userObservable = this.userSubject.asObservable();
  }

  LoginUser(login: IUserLogin): Observable<User> {
    return this.http.post<User>(this.baseApiUrl + '/Auth/Login', login).pipe(
      tap({
        next: (user) => {
          this.globalUser = user;
          this.userSubject.next(user);
          this.setUserLocalStorage(user);
          console.log('GETTING THE PRESENT USER', user);

          this.getUserById(this.globalUser.userData).subscribe({
            next: (res) => {
              this.userDetails = res;
              console.log("tttttttttttttt",this.userDetails.isAdmin);
              if (this.userDetails.isAdmin === true) {
              
                this.router.navigate([`admin/${this.userDetails.firstName}`]);
              } else {
                this.router.navigate([`user/${this.userDetails.id}`]);
              }
              this.toast.success({
                detail: `Hey, ${this.userDetails.firstName}`,
                summary: "You're now logged in...",
                duration: 4000,
              });
              // alert(`Hey ${this.userDetails.firstName}, Welcome to Ash Hotel`);
            },
          });
        },
        error: (errorRes) => {
          this.toast.error({
            detail: 'Invalid Credentials',
            summary: 'Username or Password does not exist',
            duration: 7000,
          });
        },
      })
    );
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(this.UserKey);
    this.cartService.clearCart();
    this.router.navigate(['login'])
    this.toast.info({detail: "You've been logged out", summary: "Please login to continue"})
    // window.location.reload();
  }

  Register(register: User): Observable<User> {
    return this.http.post<User>(this.baseApiUrl + '/Auth/Register', register);
  }

  register(user: User) {
    return this.http.post(`${this.baseApiUrl}/Auth/Register`, user);
  }

  loginUser(login: User): Observable<User> {
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
      this.baseApiUrl + '/Auth/UpdateUser/?Id=' + id,
      update
    );
  }
  // CHECKOUT FUNCTION FOR CURRENT USER
  public get currentUser():User{
    return this.userSubject.value;
  }

  

  getUserById(id: any): Observable<User> {
    return this.http
      .get<User>(this.baseApiUrl + '/Auth/GetUserById?Id=' + id)
      .pipe(
        map((data) => {
          return data;
        }),
        tap((res) => console.log(JSON.stringify(res)))
      );
  }

  private setUserLocalStorage(user: User) {
    localStorage.setItem(this.UserKey, JSON.stringify(user));
  }
  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(this.UserKey);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
  

