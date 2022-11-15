import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserLogin } from '../Models/ILogin';
import { Order } from '../Models/order';
import { Room } from '../Models/room';
import { User, UserItems } from '../Models/user';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public baseApiUrl: string = environment.baseApiUrl;
  globalUser: any;
  public UserKey: string = 'User';
  userDetails: any;

  UserStorageItems: UserItems = {
    message: '',
    userData: '',
    admin: false,
    email: '',
  };

  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userObservable!: Observable<User>;
  admin: any;

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private router: Router,
    private toast: NgToastService // private _location: Location
  ) {
    this.userObservable = this.userSubject.asObservable();
  }

  // backClicked() {
  //   this._location.reload();
  // }

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
              console.log('tttttttttttttt', this.userDetails.isAdmin);
              if (this.userDetails) {
              }
              if (this.userDetails.isAdmin === true) {
                console.log('CHECKING ADMIN', this.userDetails.isAdmin);
                this.router.navigate([`admin/${this.userDetails.id}`]);
              } else {
                this.router.navigate([`user/${this.userDetails.id}`]);
              }
              this.toast.success({
                detail: `Hey, ${this.userDetails.firstName}`,
                summary: "You're now logged in...",
                duration: 4000,
              });
            },
          });
        },
        error: (errorRes) => {
          this.toast.error({
            detail: 'Something went wrong',
            summary: 'Please check your details and internet',
            duration: 7000,
          });
        },
      })
    );
  }

  IsLoggedIn() {
    return !!localStorage.getItem(this.UserKey);
  }
  IsAdmin() {
    this.admin = localStorage.getItem(this.UserKey);
    this.UserStorageItems = JSON.parse(this.admin);
    console.log(this.UserStorageItems.admin, 'ISADMIN-------');
    console.log(this.UserStorageItems.message, 'MESSAGE-------');
    return this.UserStorageItems.admin;
    // console.log(this.admin, "ISADMIN-------");
  }

  // deleteOrder(id: string): Observable<Order> {
  //   return this.http.delete<Order>(
  //     this.baseApiUrl + '/api/Order/DeleteOrder?Id=' + id
  //   );
  // }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(this.UserKey);
    this.cartService.clearCart();
    this.router.navigate(['login']);
    // this._location.reload();
    this.toast.info({
      detail: "You've been logged out",
      summary: 'Please login to continue',
    });
  }

  Register(register: User): Observable<User> {
    return this.http.post<User>(this.baseApiUrl + '/Auth/Register', register);
  }

  register(user: any) {
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

  GetUserOrderrrr(id: User): Observable<any> {
    return this.http.get<any>(
      this.baseApiUrl + '/Order/GetUserOrder?userId=' + id
    );
  }

  updateUser(id: any, update: User): Observable<User> {
    return this.http.put<User>(
      this.baseApiUrl + '/Auth/UpdateUser/?Id=' + id,
      update
    );
  }
  // CHECKOUT FUNCTION FOR CURRENT USER
  public get currentUser(): User {
    return this.userSubject.value;
  }

  getUserById(id: any): Observable<User> {
    return this.http
      .get<User>(this.baseApiUrl + '/Auth/GetUserById?Id=' + id)
      .pipe(
        map((data) => {
          return data;
        })
        //tap((res) => console.log(JSON.stringify(res)))
      );
  }
  GetUserOrder(id: any): Observable<User> {
    return this.http
      .get<User>(this.baseApiUrl + '/Order/GetUserOrder?userId=' + id)
      .pipe(
        map((data) => {
          return data;
        })
        //tap((res) => console.log(JSON.stringify(res)))
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
