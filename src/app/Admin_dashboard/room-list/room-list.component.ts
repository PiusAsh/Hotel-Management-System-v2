import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Room } from 'src/app/Models/room';
import { RoomService } from 'src/app/Services/room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
})
export class RoomListComponent implements OnInit {
  rooms: Room[] = [];
  constructor(private http: RoomService, private toast: NgToastService) {}
  p: number = 1;
  collection!: any[];
  ngOnInit(): void {
    this.http.getAllRooms().subscribe((res: any) => {
      this.rooms = res;
      console.log(res);
    });
  }

  deleteRoom(id: any) {
    this.http.deleteRoom(id).subscribe({
      next: (response) => {
        window.location.reload();
        this.toast.success({
          detail: 'Order Deleted Successfully',
          duration: 5000,
        });
      },
      error: (errors) => {
        console.log(errors, 'CHECKING ERRORS-----');
        this.toast.error({
          detail: 'Oops! An error occurred',
          summary: 'Please try again later',
          duration: 4000,
        });
      },
    });
  }
}

