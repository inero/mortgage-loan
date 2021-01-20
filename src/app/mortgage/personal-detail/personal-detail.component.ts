import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MortgageService } from 'src/app/services/mortgage/mortgage.service';
import { ICustomer } from 'src/app/models/customer';

@Component({
  selector: 'app-personal-detail',
  templateUrl: './personal-detail.component.html',
  styleUrls: ['./personal-detail.component.css']
})
export class PersonalDetailComponent implements OnInit {

  public customerData: any;

  public personalForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    age: ['', [Validators.required, Validators.min(18)]],
    mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    address: this.fb.group({
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(5), Validators.maxLength(6)]],
      country: ['', [Validators.required]],
    })
  });

  constructor(public mortgageService: MortgageService, private fb: FormBuilder, private router: Router) {
    this.customerData = {};
  }

  ngOnInit(): void {
    this.mortgageService.getCustomer().subscribe((data: any) => {
      this.customerData = data[0];
      this.personalForm.patchValue({
        name: this.customerData?.personal?.name,
        email: this.customerData?.personal?.email,
        age: this.customerData?.personal?.age,
        mobile: this.customerData?.personal?.mobile,
        address: {
          city: this.customerData?.personal?.address?.city,
          street: this.customerData?.personal?.address?.street,
          country: this.customerData?.personal?.address?.country,
          pincode: this.customerData?.personal?.address?.pincode
        }
      });
    });
  }

  get personalFormControl(){
    return this.personalForm.controls;
  }

  nextPage() {
    if (this.personalForm.valid) {
      if(!this.customerData?.id){
        this.mortgageService.createCustomerPersonal(this.personalForm.value).subscribe((data: any) => {
          this.router.navigate(['customer-detail/loan']);
        });
      } else {
        const updatedFormValue = { ...this.customerData, personal: this.personalForm.value };
        this.mortgageService.updateCustomer(updatedFormValue, this.customerData?.id?.toString()).subscribe((data: any) => {
          this.router.navigate(['customer-detail/loan']);
        });
      }
    }
  }
}
