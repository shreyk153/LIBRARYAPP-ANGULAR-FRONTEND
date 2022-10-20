import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as _swal from "sweetAlert";
import { SweetAlert } from "sweetalert/typings/core";
 
const swal: SweetAlert = _swal as any; 

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {
 
  constructor(public router: Router) {
  }
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    const token: string = 'invalid token';
    req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
 
    return next.handle(req).pipe(
      catchError((error) => {
 
        let handled: boolean = false;
        //console.error("Error from global handler: ", error);
        if (error instanceof HttpErrorResponse) {
          if (error instanceof ErrorEvent) {
            console.error("Error Event");
          } else {
            //console.log(`error status : ${error.error.statusCode} ${error.error.message}`);
            switch (error.error.statusCode) {
              case 204:     //no content
                swal("Error " + String(error.error.statusCode), error.error.message, "error");
                handled = true;
                break;
              case 400:     //bad request
                swal("Error " + String(error.error.statusCode), error.error.message, "error");
                handled = true;
                break;
              case 401:      //login
                swal("Error " + String(error.error.statusCode), error.error.message, "error");
                handled = true;
                break;
              case 403:     //forbidden
                swal("Error " + String(error.error.statusCode), error.error.message, "error");
                handled = true;
                break;
              case 404:     //not found
                swal("Error " + String(error.error.statusCode), error.error.message, "error");
                handled = true;
                break;
              case 409:     //not found
                swal("Error " + String(error.error.statusCode), error.error.message, "error");
                handled = true;
                break;
              case 500:     //internal server error
                this.router.navigateByUrl("/login");
                swal("Error " + String(error.error.statusCode), error.error.message, "error");
                handled = true;
                break;
            }
          }
        }
        else {
          console.error("Other Errors.");
        }
 
        if(handled) {
          console.log('Return back.');
          throw error;
        } 
        
        else {
          console.log('Throw error back to to the subscriber.');
          throw error;
        }
 
      })
    )
  }
}