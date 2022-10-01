import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/Models/room';
import { RoomService } from 'src/app/Services/room.service';
import { IRoom } from 'src/app/Shared/IRoom';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {
rooms: Room[] = [];
  constructor(private roomService : RoomService) {
    // this.rooms = roomService.getAll();
   }
  

  ngOnInit(): void {
    this.roomService.getAllRooms().subscribe((res: any) => {
this.rooms = res;
    })
  }

}
