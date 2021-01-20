import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerDetailComponent } from './mortgage/customer-detail/customer-detail.component';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ToastModule} from 'primeng/toast';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {StepsModule} from 'primeng/steps';
import {CardModule} from 'primeng/card';
import {MenubarModule} from 'primeng/menubar';
import {DialogModule} from 'primeng/dialog';

import { PersonalDetailComponent } from './mortgage/personal-detail/personal-detail.component';
import { PropertyDetailComponent } from './mortgage/property-detail/property-detail.component';
import { LoanDetailComponent } from './mortgage/loan-detail/loan-detail.component';
import { HeaderComponent } from './shared/header/header.component';
import { MortgageDetailComponent } from './mortgage/mortgage-detail/mortgage-detail.component';
import { MortgageHistoryComponent } from './mortgage/mortgage-history/mortgage-history.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerDetailComponent,
    PersonalDetailComponent,
    PropertyDetailComponent,
    LoanDetailComponent,
    HeaderComponent,
    MortgageDetailComponent,
    MortgageHistoryComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MenubarModule,
    TableModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    StepsModule,
    CardModule,
    AppRoutingModule,
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
