import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../home/page-not-found/page-not-found.component';
import { MemberListComponent } from './memberlist.component';

const routes: Routes = [
  { 
    path: "",
    component: MemberListComponent,

    children: [
        {
            path: "",
            component: MemberListComponent
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
export class MemberListRoutingModule { }

