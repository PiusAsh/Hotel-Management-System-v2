import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/Models/room';
import { RoomService } from 'src/app/Services/room.service';

@Component({
  selector: 'app-hotel-rooms',
  templateUrl: './hotel-rooms.component.html',
  styleUrls: ['./hotel-rooms.component.css'],
})
export class HotelRoomsComponent implements OnInit {
  rooms: Room[] = [];
  constructor(private roomService: RoomService) {
    // this.rooms = roomService.getAll();
  }

  ngOnInit(): void {
    this.roomService.getAllRooms().subscribe((res: any) => {
      this.rooms = res;
    });
  }
}
