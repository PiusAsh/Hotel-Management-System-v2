import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { sampleRoom } from '../demoData';
import { IRoom } from '../Shared/IRoom';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor() { }
  getAll(): IRoom[]{
    return sampleRoom;
  }

  getRoomById(roomName : any): IRoom{
    return this.getAll().find(room => room.roomName == roomName) ?? new IRoom();
  }
}
