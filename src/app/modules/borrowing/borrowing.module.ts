import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BorrowingListComponent } from './borrowing.component';
import { BorrowingRoutingModule } from './borrowing-routing.module';


@NgModule({
  declarations: [
    BorrowingListComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    BorrowingRoutingModule
  ]
})
export class BorrowingModule { }