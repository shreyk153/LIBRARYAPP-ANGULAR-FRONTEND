import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
 
@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
    constructor() {}
  
    handleError(error: any) {
      if (!(error instanceof HttpErrorResponse)) {
        error = error.rejection;
      }
      //console.error('Error from global error handler', error);
    }
  }