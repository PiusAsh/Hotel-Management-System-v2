import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from 'src/app/Services/room.service';
import { IRoom } from 'src/app/Shared/IRoom';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.css']
})
export class ViewRoomComponent implements OnInit {
room!: IRoom
  constructor(private http: HttpClient, activatedRoute: ActivatedRoute, roomService: RoomService) { 
    activatedRoute.params.subscribe((params) => {
      if(params['id'])
      this.room = roomService.getRoomById(params['id']);
    })

  }

  ngOnInit(): void {
  }

}
