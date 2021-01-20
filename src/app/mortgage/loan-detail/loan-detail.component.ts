import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICustomer } from 'src/app/models/customer';
import { MortgageService } from 'src/app/services/mortgage/mortgage.service';

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.css']
})
export class LoanDetailComponent implements OnInit {

  public customerData: any;
  public occupationOptions: any[];

  public loanForm = this.fb.group({
    amount: ['', [Validators.required]],
    tenure: ['', [Validators.required]],
    occupation: ['', [Validators.required]],
    monthlyIncome: ['', [Validators.required]],
    monthlyEMI: ['']
  });

  constructor(public mortgageService: MortgageService, private fb: FormBuilder, private router: Router) {
    this.customerData = {};
    this.occupationOptions = [{
      code: 1,
      value: "Employed"
    }, {
      code: 2,
      value: "Self Employed"
    }];
  }

  ngOnInit(): void {
    this.mortgageService.getCustomer().subscribe((data: any) => {
      this.customerData = data[0];
      this.loanForm.patchValue({
        amount: this.customerData?.loan?.amount,
        tenure: this.customerData?.loan?.tenure,
        occupation: this.customerData?.loan?.occupation,
        monthlyIncome: this.customerData?.loan?.monthlyIncome,
        monthlyEMI: this.customerData?.loan?.monthlyEMI
      });
    });
  }

  nextPage() {
    if (this.loanForm.value) {
      const updatedFormValue = { ...this.customerData, loan: this.loanForm.value };
      this.mortgageService.updateCustomer(updatedFormValue, this.customerData?.id).subscribe((data: any) => {
        this.router.navigate(['customer-detail/property']);
      });
    }
  }

  prevPage() {
    this.router.navigate(['customer-detail/personal']);
  }

}
