import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/Services/room.service';
import { IRoom } from 'src/app/Shared/IRoom';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {
rooms: IRoom[] = [];
  constructor(private roomService : RoomService) {
    this.rooms = roomService.getAll();
   }

  ngOnInit(): void {
  }

}
