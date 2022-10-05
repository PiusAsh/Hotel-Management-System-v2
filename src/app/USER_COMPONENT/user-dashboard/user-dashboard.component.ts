import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginResponse, User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
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
  };
  
  constructor(private userService: UserService, private route: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id: any = params.get('id');
        if(id){
          this.userService.getUserById(id).subscribe({
            next: (res) => {
              this.user = res;
              console.log("res %%%%%%%%%", res)
              this.route.navigate([`user/${res.id}`])
            },
          })
        }
      }
    });
  }

  getUserId(id: any){
    this.userService.getUserById(id).subscribe({
      next: (res) =>{
        this.route.navigate([`user/${res.id}`]);
        // this.route.navigate([`user`]);
        console.log(res);
        
      }
    });
     console.log(this.user);
  }
}
