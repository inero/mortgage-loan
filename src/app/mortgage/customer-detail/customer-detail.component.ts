import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  // public activeIndex: number = 1;
  public items: any[];

  constructor(private messageService: MessageService) { 
    this.items = [];
  }

  ngOnInit(): void {
    this.items = [{
      label: 'Personal',
      routerLink: 'personal'
    },
    {
      label: 'Loan',
      routerLink: 'loan'
    },
    {
      label: 'Property',
      routerLink: 'property'
    },
    {
      label: 'Confirmation',
      routerLink: 'confirmation'
    }
    ];
  }

}
