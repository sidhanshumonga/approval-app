import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LeftbarComponent } from './leftbar/leftbar.component';
import { PendingListComponent } from './pending-list/pending-list.component';
import { ApprovedListComponent } from './approved-list/approved-list.component';
import { RejectedListComponent } from './rejected-list/rejected-list.component';
import { RejectionPopupComponent } from './rejection-popup/rejection-popup.component';

import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LeftbarComponent,
    PendingListComponent,
    ApprovedListComponent,
    RejectedListComponent,
    RejectionPopupComponent,
    DateFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    RejectionPopupComponent
  ]
})
export class AppModule { }
