import {  NgModule } from '@angular/core';
import { CanActivate, RouterModule, Routes } from '@angular/router';

export class LoginGuard implements CanActivate
{
  canActivate()
  {
    console.log('Login guard activated');
    return sessionStorage.getItem("loginSuccess")==='true';
  }
}

export class AdminGuard implements CanActivate
{
  static userId: number = -1;
  canActivate() 
  {
    console.log('Admin guard activated');
    return sessionStorage.getItem("isAdmin")==='true';
  }
}

const routes: Routes = [
  { path: "", redirectTo: "welcome", pathMatch: "full" },
  {
    path: "welcome", 
    loadChildren: () => import("./modules/home/welcome.module").then(m => m.WelcomeModule),
    canActivate: []
  },
  {
    path: "booklist", 
    loadChildren: () => import("./modules/books/booklist.module").then(m => m.BooklistModule),
    canActivate: [LoginGuard]
  },
  {
    path: "borrowing", 
    loadChildren: () => import("./modules/borrowing/borrowing.module").then(m => m.BorrowingModule),
    canActivate: [LoginGuard]
  },
  {
    path: "login", 
    loadChildren: () => import("./modules/login/login.module").then(m => m.LoginModule),
    canActivate: []
  },
  {
    path: "bookdata", 
    loadChildren: () => import("./modules/bookdata/bookdata.module").then(m => m.BookDataModule),
    canActivate: [LoginGuard, AdminGuard]
  },
  {
    path: "members", 
    loadChildren: () => import("./modules/memberlist/memberlist.module").then(m => m.MemberlistModule),
    canActivate: [AdminGuard]
  },
  {
    path: "profile", 
    loadChildren: () => import("./modules/profile/profile.module").then(m => m.ProfileModule),
    canActivate: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginGuard, AdminGuard]
})
export class AppRoutingModule {}
