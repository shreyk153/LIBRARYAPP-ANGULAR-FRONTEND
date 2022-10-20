import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { combineLatest } from "rxjs";
import { AdminGuard } from "src/app/app-routing.module";
import * as _swal from 'sweetAlert';
import { SweetAlert } from "sweetalert/typings/core";

const swal: SweetAlert = _swal as any;

@Component({
    selector: 'lma-borrowings',
    templateUrl: './borrowing.component.html',
    styleUrls: ['./borrowing.component.css']
})
export class BorrowingListComponent implements OnInit
{
    fine: string = '';
    pageTitle: string = this.staticAdmin==='true' ? 'Member Borrowings':'Your Borrowings'; 
    myResponse: any;
    fineResponse: any;
    readonly APP_URL = 'http://localhost:8091/LibraryApp';
  
    constructor(private _http: HttpClient) { }

    get staticAdmin()
    {
      return sessionStorage.getItem("isAdmin");
    }

    ngOnInit(): void 
    {
      if(this.staticAdmin==='true')
      {
        this.getAllBorrowings(AdminGuard.userId+'');
      }
      else
      {
        this.getAllBorrowings(sessionStorage.getItem("membershipId")+'');
      }
    }

    getAllBorrowings(id: string): void
    {
      combineLatest([this._http.get(this.APP_URL + '/memberborrowings?id='+id), 
                    this._http.get(this.APP_URL + '/getfine?membershipId='+id)])
                    .subscribe({
        next: ([data1, data2]) => {
          this.myResponse = data1;
          this.fineResponse = data2;
          this.fine = this.fineResponse.message;
        },
        
        error: error => {
          this.myResponse = null;
          console.log('Error occured', error);
        }});
    }

    returnBook(isbn: number)
    {
      const id = sessionStorage.getItem("membershipId");
      this._http.delete(this.APP_URL + '/returnbook?membershipId='+id+'&isbn='+isbn).subscribe({
        next: data => {
          this.myResponse = data;
          swal("Success!!", this.myResponse.message , 'success');
          this.myResponse = null;
          console.log(data);
          this.ngOnInit();
        },
        error: error => {
          this.myResponse = null;
          console.log('Error occured', error);
          this.ngOnInit();
        }});
    }
}