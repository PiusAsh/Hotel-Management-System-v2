import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css']
})
export class RegisteredUsersComponent implements OnInit {
users: User[] = [];
  constructor(private http: UserService) { }

  ngOnInit(): void {
    this.http.getAllUsers().subscribe((data: any) => {
      this.users = data;
      console.log(data);
    });
  }

}
