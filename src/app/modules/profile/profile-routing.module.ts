import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../home/page-not-found/page-not-found.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  { 
    path: "",
    component: ProfileComponent,
    children: [
        {
            path: "",
            component: ProfileComponent
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
export class ProfileRoutingModule { }