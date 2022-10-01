import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, sample } from 'rxjs';
import { environment } from 'src/environments/environment';
import { sampleRoom } from '../demoData';
import { Room } from '../Models/room';
import { User } from '../Models/user';
import { IRoom } from '../Shared/IRoom';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) {}
  getAll(): IRoom[] {
    return sampleRoom;
  }
// room: Room = {
//   roomName: '',
//   roomPrice: '',
//   roomDes: '',
//   id: 0,
//   roomImg: '',
//   roomType: ''
// };
  GetRoomById(id: any): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/HotelRoom/GetRoomById' + id);
  }


  // getRoomById(roomName: any): IRoom {
  //   return (
  //     this.getAll().find((room) => room.roomName == roomName) ?? new IRoom()
  //   );
  // }

  getAllRooms(): Observable<User[]> {
    return this.http.get<User[]>(this.baseApiUrl + '/HotelRoom/GetAllRooms');
  }

  AddRooms(room: Room): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + '/HotelRoom/AddRoom', room);
  }
}
