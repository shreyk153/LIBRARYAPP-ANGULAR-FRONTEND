import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MemberListRoutingModule} from './memberlist-routing.module';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './memberlist.component';


@NgModule({
  declarations: [
    MemberListComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    MemberListRoutingModule
  ]
})
export class MemberlistModule { }