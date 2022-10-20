import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookListComponent } from './booklist.component';
import { BookListRoutingModule} from './booklist-routing.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    BookListComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    BookListRoutingModule
  ]
})
export class BooklistModule { }