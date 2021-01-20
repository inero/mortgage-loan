import { Component, OnInit } from '@angular/core';
import { MortgageService } from 'src/app/services/mortgage/mortgage.service';
import { Router } from '@angular/router';
import { IEstimation } from 'src/app/models/customer';
import { eightyPercentage, sixtyPercentage, propertyLocation, pricePerSqFt, propertyAgeList } from 'src/app/constants/common';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-mortgage-detail',
  templateUrl: './mortgage-detail.component.html',
  styleUrls: ['./mortgage-detail.component.css']
})
export class MortgageDetailComponent implements OnInit {

  public customerData: any;
  public customerDialog: boolean;
  public landValue: any[];
  public pricePerSqFt: any[];
  public propertyAgeCheck: any[];
  public estimation: IEstimation;

  constructor(public mortgageService: MortgageService, private messageService: MessageService, private router: Router) {
    this.customerDialog = false;
    this.estimation = {
      mortgageValue: 0,
      sanctionedAmount: 0,
      offeringAmount: 0,
      eligiblility: false,
      EMIAmount: 0,
      EMITenure: 0,
    };
    this.propertyAgeCheck =propertyAgeList;
    this.pricePerSqFt = pricePerSqFt;
    this.landValue = propertyLocation;
  }

  ngOnInit(): void {
    this.mortgageService.getCustomer().subscribe((data: any) => {
      this.customerData = data[0];
    });
  }

  hideDialog() {
    this.customerDialog = false;
  }

  approvedValue(totalValue: number) {
    return eightyPercentage * totalValue;
  }

  complete() {
    if (this.customerData) {
      const { property, loan } = this.customerData;
      const propPricePerSqFt = this.pricePerSqFt.find((item) => item.code == (property?.propertyArea || 1));
      const propPricePerSqFtAge = this.propertyAgeCheck.find((item) => item.code == (property?.propertyAge || 1));
      const realAgeWiseValuePerSqFt = propPricePerSqFt.value * (propPricePerSqFtAge.percentage / 100);
      const propertyValue = this.approvedValue(Number(property.propertySize) * realAgeWiseValuePerSqFt);
      const eligibleIncome = Number(loan.monthlyIncome) * sixtyPercentage;
      const monthlyEmiEligible = loan.amount / (loan.tenure * 12);
      this.estimation.mortgageValue = propertyValue;
      if (loan.amount < propertyValue) {
        if (monthlyEmiEligible < eligibleIncome) {
          this.estimation.eligiblility = true;
          this.estimation.sanctionedAmount = loan.amount;
          this.estimation.EMIAmount = monthlyEmiEligible;
          this.estimation.EMITenure = loan.tenure;
          this.estimation.offeringAmount = propertyValue;
        } else {
          this.estimation.eligiblility = false;
          this.estimation.sanctionedAmount = this.estimation.mortgageValue;
          this.estimation.EMIAmount = this.estimation.mortgageValue / (loan.tenure * 12);
          this.estimation.EMITenure = loan.tenure;
          this.estimation.offeringAmount = 0;
        }
      } else {
        this.estimation.eligiblility = false;
        this.estimation.sanctionedAmount = propertyValue;
        this.estimation.EMIAmount = propertyValue / (loan.tenure * 12);;
        this.estimation.EMITenure = loan.tenure;
        this.estimation.offeringAmount = 0;
      }
      this.customerDialog = true;
    }
  }

  confirm() {
    const updatedFormValue = { ...this.customerData, estimation: this.estimation };
    this.mortgageService.updateCustomer(updatedFormValue, this.customerData?.id).subscribe((data: any) => {
      this.mortgageService.createCustomerHistory(updatedFormValue).subscribe((data: any) => {
        this.mortgageService.deleteCustomer(this.customerData?.id).subscribe((data: any) => {
          this.customerDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Your loan has been applied successfully!!', life: 3000 });
          this.router.navigate(['history']);
        });
      });
    });
  }

  prevPage() {
    this.router.navigate(['customer-detail/property']);
  }

}
