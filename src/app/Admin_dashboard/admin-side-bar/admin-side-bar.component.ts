import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/Models/user';
import { CartService } from 'src/app/Services/cart.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrls: ['./admin-side-bar.component.css'],
})
export class AdminSideBarComponent implements OnInit {
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
  constructor(
    private userService: UserService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private toast: NgToastService
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
              this.route.navigate([`admin/${res.id}`]);
            },
          });
        }
      },
    });
  }

  getUserId(id: any) {
    this.userService.getUserById(id).subscribe({
      next: (res) => {
        this.route.navigate([`admin/${res.id}`]);
        // this.route.navigate([`user`]);
        console.log(res);
      },
    });
    console.log(this.user);
  }

  /*this.userService.logout();
this.route.navigate(['login']);*/
  // this.cartQuantity = 0;
}
