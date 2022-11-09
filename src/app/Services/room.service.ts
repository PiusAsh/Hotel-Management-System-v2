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
  room: Room = {
    roomName: '',
    roomPrice: 0,
    roomDes: '',
    id: 0,
    roomImg: '',
    roomType: '',
  };
  constructor(private http: HttpClient) {}
  // getAll():   Room[]{
  //   return this.room;
  // }
  // getAll():   IRoom[] {
  //   return sampleRoom;
  // }

  GetRoomById(id: any): Observable<any> {
    return this.http.get<any>(
      this.baseApiUrl + '/HotelRoom/GetRoomById?Id=' + id
    );
  }

  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.baseApiUrl + '/HotelRoom/GetAllRooms');
  }

  AddRooms(room: Room): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + '/HotelRoom/AddRoom', room);
  }
  DeleteRoom(id: string): Observable<Room> {
    return this.http.delete<Room>(
      this.baseApiUrl + '/HotelRoom/DeleteRoom' + id
    );
  }

  updateRoom(id: string, update: Room): Observable<Room> {
    return this.http.put<Room>(
      this.baseApiUrl + '/HotelRoom/UpdateRoom' + id,
      update
    );
  }

  deleteRoom(id: string): Observable<Room> {
    return this.http.delete<Room>(
      this.baseApiUrl + '/HotelRoom/DeleteRoom?Id=' + id
    );
  }
}
