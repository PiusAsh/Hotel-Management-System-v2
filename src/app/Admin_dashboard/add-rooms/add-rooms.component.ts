import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-rooms',
  templateUrl: './add-rooms.component.html',
  styleUrls: ['./add-rooms.component.css']
})
export class AddRoomsComponent implements OnInit {
roomForm!: FormGroup
  constructor(private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.roomForm = this.formBuilder.group({
      roomName: ['', Validators.required],
      roomDes: ['', Validators.required],
      roomImg: ['', Validators.required],
      roomType: ['', Validators.required],
      roomPrice: ['', Validators.required]
    })
  }

}
