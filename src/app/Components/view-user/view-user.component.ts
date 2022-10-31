import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
})
export class ViewUserComponent implements OnInit {
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
    isAdmin: false,
  };

  recentRoom: any;
  orderCount: any;
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id: any = params.get('id');
        if (id) {
          this.userService.getUserById(id).subscribe({
            next: (res) => {
              this.user = res;
              console.log('res %%%%%%%%%', res);
              this.router.navigate([`view-user/${res.id}`]);
            },
          });
          this.userService.GetUserOrder(id).subscribe({
            next: (res: any) => {
              this.router.navigate([`view-user/${res.id}`]);
              console.log(res);
              this.recentRoom = res.recentRoom;
              this.orderCount = res.orderCount;
              console.log(this.recentRoom, ' CHECKING RECENT ROOM');
                    console.log(this.orderCount, ' CHECKING ORDER COUNT');
            }
          });
        }
      },
    });
  }

  getUserOrder(id: any) {
    this.userService.GetUserOrder(id).subscribe({
      next: (res) => {
        this.router.navigate([`view-user/${res.id}`]);
        console.log(res);
      },
    });
    console.log(this.user);
  }

  updateUser() {
    this.userService.updateUser(this.user.id, this.user).subscribe({
      next: (response: any) => {
        this.router.navigate(['reg-users']);
      },
    });
  }
}
