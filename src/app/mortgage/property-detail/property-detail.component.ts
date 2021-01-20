import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MortgageService } from 'src/app/services/mortgage/mortgage.service';
import { propertyAgeList, propertyType, propertyLocation } from 'src/app/constants/common';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  public customerData: any;
  public area: any[];
  public type: any[];
  public age: any[];

  public propertyForm = this.fb.group({
    propertySize: ['', [Validators.required]],
    propertyType: ['', [Validators.required]],
    propertyArea: ['', [Validators.required]],
    propertyAge: ['', [Validators.required]],
  });

  constructor(public mortgageService: MortgageService, private fb: FormBuilder, private router: Router) {
    this.customerData = {};
    this.age = propertyAgeList;
    this.type = propertyType;
    this.area = propertyLocation;
  }

  ngOnInit(): void {
    this.mortgageService.getCustomer().subscribe((data: any) => {
      this.customerData = data[0];
      this.propertyForm.patchValue({
        propertySize: this.customerData?.property?.propertySize,
        propertyType: this.customerData?.property?.propertyType,
        propertyArea: this.customerData?.property?.propertyArea,
        propertyAge: this.customerData?.property?.propertyAge,
      });
    });
  }

  nextPage() {
    if (this.propertyForm.value) {
      const updatedFormValue = { ...this.customerData, property: this.propertyForm.value };
      this.mortgageService.updateCustomer(updatedFormValue, this.customerData?.id).subscribe((data: any) => {
        this.router.navigate(['customer-detail/estimation']);
      });
    }
  }

  prevPage() {
    this.router.navigate(['customer-detail/loan']);
  }

}
