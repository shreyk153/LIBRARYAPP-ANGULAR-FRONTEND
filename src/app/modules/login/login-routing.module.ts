import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { PageNotFoundComponent } from '../home/page-not-found/page-not-found.component';
import { LoginComponent } from './login.component';

const routes: Routes = [
  { 
    path: "",
    component: LoginComponent,
    children: [
        {
            path: "",
            component: LoginComponent
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
export class LoginRoutingModule {}
