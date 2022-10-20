import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../home/page-not-found/page-not-found.component';
import { BorrowingListComponent } from './borrowing.component';
const routes: Routes = [
  { 
    path: "",
    component: BorrowingListComponent,

    children: [
        {
            path: "",
            component: BorrowingListComponent
        }
    ]
  },
  {
      path: "**",
      component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BorrowingRoutingModule { }

