import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerDetailComponent } from './mortgage/customer-detail/customer-detail.component';
import { PersonalDetailComponent } from './mortgage/personal-detail/personal-detail.component';
import { LoanDetailComponent } from './mortgage/loan-detail/loan-detail.component';
import { PropertyDetailComponent } from './mortgage/property-detail/property-detail.component';
import { MortgageDetailComponent } from './mortgage/mortgage-detail/mortgage-detail.component';
import { MortgageHistoryComponent } from './mortgage/mortgage-history/mortgage-history.component';

const routes: Routes = [
  { 
    path: 'customer-detail', 
    component: CustomerDetailComponent,
    children:[
      { path:'', redirectTo: 'personal', pathMatch: 'full' },
      { path:'personal', component: PersonalDetailComponent },
      { path:'loan', component: LoanDetailComponent },
      { path:'property', component: PropertyDetailComponent },
      { path:'estimation', component: MortgageDetailComponent },
    ] 
  },
  { path: 'history', component: MortgageHistoryComponent },
  { path: '', redirectTo: '/customer-detail', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
