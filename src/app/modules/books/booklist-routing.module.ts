import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../home/page-not-found/page-not-found.component';
import { BookListComponent } from './booklist.component';

const routes: Routes = [
  { 
    path: "",
    component: BookListComponent,

    children: [
        {
            path: "",
            component: BookListComponent
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
export class BookListRoutingModule { }

