import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css'],
})
export class ReceiptComponent implements OnInit {
  todayDate = Date.now();
  constructor() {}

  ngOnInit(): void {}

  printReceipt(){
    window.print();
  }
}
