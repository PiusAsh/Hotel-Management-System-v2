import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrls: ['./admin-side-bar.component.css'],
})
export class AdminSideBarComponent implements OnInit {
  userDetails: User = {
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
  res: any;
  userId: any;
  constructor(
    private userService: UserService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    console.log('GETTING USER ID', this.userId);

    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id: any = params.get('id');
        if (id) {
          this.userService.getUserById(id).subscribe({
            next: (res) => {
              this.userDetails = res;
              this.userId = this.userDetails.id;
              console.log('res %%%%%%%%%', res);
              console.log(' CHECKING THE ID', res.id);
              // this.route.navigate([`admin/${res.id}`]);
            },
          });
        }
      },
    });
  }

  //  get userId(){
  //                 return this.res.id;
  //   }

  getUserId(id: any) {
    this.userService.getUserById(id).subscribe({
      next: (res) => {
        // this.route.navigate([`admin/${res.id}`]);
        // this.route.navigate([`user`]);
        console.log(res);
      },
    });
  }
  // refresh(): void {
  //   window.location.reload();
  // }
  logout() {
    this.userService.logout();
    
    // this.route.navigate(['login']);
    // this.refresh();
  }
}
