import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../home/page-not-found/page-not-found.component';
import { BookDataComponent } from './bookdata.component';

const routes: Routes = [
  { 
    path: "",
    component: BookDataComponent,
    children: [
        {
            path: "",
            component: BookDataComponent
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
  exports: [RouterModule]
})
export class BookDataRoutingModule { }