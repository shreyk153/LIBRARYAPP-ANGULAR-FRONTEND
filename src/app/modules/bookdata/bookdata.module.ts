import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookDataComponent } from './bookdata.component';
import { BookDataRoutingModule } from './bookdata-routing.module';


@NgModule({
  declarations: [
    BookDataComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    BookDataRoutingModule
  ]
})
export class BookDataModule { }