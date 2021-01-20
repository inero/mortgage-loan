import { Component, OnInit } from '@angular/core';
import { MortgageService } from 'src/app/services/mortgage/mortgage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mortgage-history',
  templateUrl: './mortgage-history.component.html',
  styleUrls: ['./mortgage-history.component.css']
})
export class MortgageHistoryComponent implements OnInit {

  public historyData: any[];

  constructor(public mortgageService: MortgageService, private router: Router) { 
    this.historyData = [];
  }

  ngOnInit(): void {
    this.mortgageService.getHistory().subscribe((data: any) => {
      this.historyData = data;
    });
  }

}
