import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/Models/room';
import { RoomService } from 'src/app/Services/room.service';
import { IRoom } from 'src/app/Shared/IRoom';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.css']
})
export class ViewRoomComponent implements OnInit {
room: Room ={
  roomName: '',
  roomPrice: '',
  roomDes: '',
  id: 0,
  roomImg: '',
  roomType: ''
};

// room: Room[] = [];
// room!: IRoom
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private roomService: RoomService, private route: Router) { 
    // activatedRoute.params.subscribe((params) => {
    //   if(params['id'])
    //   this.room = roomService.GetRoomById(params['id'])
    // });
    // activatedRoute.params.subscribe((params) => {
    //   if(params['id'])
    //   this.room = roomService.getRoomById(params['id']);
    // })

  //   this.http.getAllUsers().subscribe((data: any) => {
  //     this.users = data;
  //     console.log(data);
  //   });
  // }

  
}
  
  ngOnInit(): void {
    // this.activatedRoute.params.subscribe((params : any) => {
    //   if (params['id']) this.room = this.roomService.GetRoomById(params['id']);
    // });

    //     this.activatedRoute.params.subscribe({
    //   next: (params) => {
    //    const id = params.get('id');
    //     if(id) {
    // //call api
    // this.roomService.GetRoomById(id)
    // .subscribe({
    //   next: (response) => {console.log('******CHECKING', response);

    // this.room = response;
    //   }
    // });
    //    }

    //     this.roomService.GetRoomById(this.room.id).subscribe((data: any) => {
    //       this.room = data;
    //       console.log(data);
    //     });
    //   }
    // }

    // this.activatedRoute.params.subscribe((params : any) => {
    //   if (params['id']) this.room = this.roomService.GetRoomById(params['id']);
    // });
    this.activatedRoute.params.subscribe((params: any) => {
      const id = params.get('id');
      if (id) {
        //call api
        this.roomService.GetRoomById(id).subscribe({
          next: (response) => {
            console.log('******CHECKING', response);

            this.room = response;
            console.log('******CHECKING', this.room);
          },
        });
      }
    });
    // this.activatedRoute.params.subscribe({
    //   next: (params) => {
    //     const id = params.get('id');

    //     if (id) {
    //       //call api
    //       this.roomService.GetRoomById(id).subscribe({
    //         next: (response) => {
    //           console.log('******CHECKING', response);

    //           this.room = response;
    //         },
    //       });
    //     }
    //   },
    // });

    // this.room = this.activatedRoute.params.subscribe(params => {
    //   this.room = this.roomService.GetRoomById(params['id']);
    // })
    // this.activatedRoute.params.subscribe((params: any) => {
    //   this.room.id = +params.id;
    //   this.room = this.roomService.GetRoomById(this.room.id);
    // });
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id: any = params.get('id');
        if (id) {
          this.roomService.GetRoomById(id).subscribe({
            next: (response) => {
              this.room = response;
            },
          });
        }
      },
    });
  }
  GetRoom(id: any){
    this.roomService.GetRoomById(id).subscribe({
      next: (res) => {
        this.route.navigate([`room/${res.id}`]);
        console.log(res);
      },
    });
  

  }
  }

