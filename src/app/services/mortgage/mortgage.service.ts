import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../common/common.service';
import { ICustomer, IPersonal, ILoan } from 'src/app/models/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MortgageService {

  constructor(private http: HttpClient, private restService: CommonService<ICustomer>) { }

  public getCustomer(): Observable<ICustomer> {
    return this.restService.get('mortgage', '');
  }

  public getHistory(): Observable<ICustomer> {
    return this.restService.get('history', '');
  }

  public createCustomerPersonal(personal: IPersonal): Observable<ICustomer> {
    const customer: ICustomer = {
      id: this.generateCode(),
      personal,
    };
    return this.restService.post('mortgage', customer);
  }

  public updateCustomer(customer: ICustomer, id: string): Observable<ICustomer> {
    return this.restService.put('mortgage', customer, id);
  }

  public deleteCustomer(id: string): Observable<ICustomer> {
    return this.restService.delete('mortgage', id);
  }

  public createCustomerHistory(customer: ICustomer): Observable<ICustomer> {
    return this.restService.post('history', customer);
  }

  public generateCode() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

}
