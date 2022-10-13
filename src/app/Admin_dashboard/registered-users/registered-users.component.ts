import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css'],
})
export class RegisteredUsersComponent implements OnInit {
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    address: '',
    state: '',
    country: '',
    password: '',
    dateOfBirth: '',
    gender: '',
    isAdmin: false
  };

  users: User[] = [];
  constructor(private http: UserService, private route: Router) {}

  ngOnInit(): void {
    this.http.getAllUsers().subscribe((data: any) => {
      this.users = data;
      console.log(data);
    });
  }

  deleteUser(id: any) {
    this.http.DeleteUser(id).subscribe({
      next: (response: any) => {
        // this.route.navigate(['dashboard']);
      },
    });
  }
  
  // deleteGuest(id: string) {
  //   this.http.DeleteUser(id).subscribe({
  //     next: (response: any) => {
  //     },
  //   });
  // }
}
