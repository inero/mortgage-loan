import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public items: any[];

  constructor() { 
    this.items = [];
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Mortgage Loan',
      }
    ];
  }

}
