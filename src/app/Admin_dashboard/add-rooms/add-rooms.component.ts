import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Room } from 'src/app/Models/room';
import { User } from 'src/app/Models/user';
import { RoomService } from 'src/app/Services/room.service';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-rooms',
  templateUrl: './add-rooms.component.html',
  styleUrls: ['./add-rooms.component.css'],
})
export class AddRoomsComponent implements OnInit {
  public roomForm!: FormGroup;
  // baseApiUrl: string = environment.baseApiUrl;

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

  rooms: Room = {
    roomName: '',
    roomPrice: 0,
    roomDes: '',
    id: 0,
    roomImg: '',
    roomType: '',
  };
  constructor(
    private formBuilder: FormBuilder,
    private http: RoomService,
    private route: Router, private activatedRoute: ActivatedRoute, private userService: UserService
  ) {}

  ngOnInit(): void {
console.log("GETTING USER ID",this.userId)

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
  

  //  get userId(){
  //                 return this.res.id;
  //   }

  



    this.roomForm = this.formBuilder.group({
      roomName: ['', Validators.required],
      roomDes: ['', Validators.required],
      roomImg: [''],
      roomType: ['', Validators.required],
      roomPrice: ['', Validators.required],
      // roomPrice: this.formBuilder.control(['', Validators.required]),
      // roomName: this.formBuilder.control(['', Validators.required]),
      // roomType: this.formBuilder.control(['', Validators.required]),
      // roomDes: this.formBuilder.control(['', Validators.required]),
      // roomImg: this.formBuilder.control(['', Validators.required]),
    });
  }
  // employeeName: this.formBuilder.control(''),
  AddRooms() {
    this.rooms = this.roomForm.value;
    console.log(this.rooms.roomImg);
    this.rooms.roomImg = this.rooms.roomImg
      .slice(this.rooms.roomImg.indexOf('fakepath'))
      .replace('fakepath\\', 'assets/images/');

    console.log(this.rooms.roomImg);
    this.http.AddRooms(this.rooms).subscribe((res: any) => {
      this.rooms = res;
      console.log(res);
      this.roomForm.reset();
      this.route.navigate(['room-list']);
    });
  }
}
