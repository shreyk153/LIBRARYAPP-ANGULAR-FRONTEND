import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooklistModule } from './modules/books/booklist.module';
import { BrowserModule } from '@angular/platform-browser';
import { LoginModule } from './modules/login/login.module';
import { BookDataModule } from './modules/bookdata/bookdata.module';
import { BorrowingModule } from './modules/borrowing/borrowing.module';
import { GlobalHttpInterceptorService } from './services/global-http-interceptor.service';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';
import { MemberlistModule } from './modules/memberlist/memberlist.module';
import { ProfileModule } from './modules/profile/profile.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BooklistModule,
    ProfileModule,
    LoginModule,
    BookDataModule,
    BorrowingModule,
    MemberlistModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }],

  bootstrap: [ AppComponent ]
})
export class AppModule { }
