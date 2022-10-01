import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/Models/room';
import { User } from 'src/app/Models/user';
import { RoomService } from 'src/app/Services/room.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
user: User[] = [];
rooms: Room[] = [];
  constructor(private http: UserService, private roomService: RoomService) { }

  ngOnInit(): void {
    this.http.getAllUsers().subscribe((data: any) => {
      this.user = Array.from(Object.keys(data), (k) => data[k]);
    });

    this.roomService.getAllRooms().subscribe((res: any) => {
      this.rooms = res;
    })

  }

}
