import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/Models/room';
import { RoomService } from 'src/app/Services/room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
rooms: Room[] = [];
  constructor(private http: RoomService) { }

  ngOnInit(): void {
    this.http.getAllRooms().subscribe((res: any) => {
      this.rooms = res;
      console.log(res)
    })

  }

}
