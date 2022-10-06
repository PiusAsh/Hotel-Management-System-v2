import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/Models/room';
import { CartService } from 'src/app/Services/cart.service';
import { RoomService } from 'src/app/Services/room.service';
import { IRoom } from 'src/app/Shared/IRoom';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.css'],
})
export class ViewRoomComponent implements OnInit {
  room: Room = {
    roomName: '',
    roomPrice: 0,
    roomDes: '',
    id: 0,
    roomImg: '',
    roomType: '',
  };

  // room: Room[] = [];
  // room!: Room;
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private roomService: RoomService,
    private route: Router, private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id: any = params.get('id');
        if (id) {
          this.roomService.GetRoomById(id).subscribe({
            next: (res) => {
              this.room = res;
              console.log('res %%%%%%%%%', res);
              this.route.navigate([`room/${res.id}`]);
            },
          });
        }
      },
    });
  }
  getRoomId(id: any) {
    this.roomService.GetRoomById(id).subscribe({
      next: (res) => {
        this.route.navigate([`room/${res.id}`]);
        // this.route.navigate([`user`]);
        console.log(res);
      },
    });
    console.log(this.room);
  }

  addToCart(){
    this.cartService.addToCart(this.room);
    this.route.navigateByUrl('/cart-page')
  }
}

