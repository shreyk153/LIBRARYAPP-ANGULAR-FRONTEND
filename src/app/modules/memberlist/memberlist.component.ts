import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AdminGuard } from "src/app/app-routing.module";
import { Router } from "@angular/router";
import * as _swal from 'sweetAlert';
import { SweetAlert } from "sweetalert/typings/core";

const swal: SweetAlert = _swal as any;

@Component({
    selector: 'lma-members',
    templateUrl: './memberlist.component.html',
    styleUrls: ['./memberlist.component.css']
})
export class MemberListComponent implements OnInit
{
    pageTitle: string = 'Member List';
    myResponse: any;
    readonly APP_URL = 'http://localhost:8091/LibraryApp';
    
  
    constructor(private _http: HttpClient, private _router: Router) { }

    get staticAdmin()
    {
      return sessionStorage.getItem("isAdmin");
    }
    
  ngOnInit(): void 
  {
      this._http.get(this.APP_URL + '/members').subscribe({
        next: data => {
          this.myResponse = data;
        },
        error: error => {
          this.myResponse = null;
          console.log('Error occured', error);
        }});
  }

  showUserBorrowings(id: number)
  {
    AdminGuard.userId = id;
    this._router.navigate(["/borrowing"]);
  }

  delete(id: number)
  {
    swal({
      title: "Are you sure?",
      text: "Profile will be deleted.",
      icon: "warning",
      dangerMode: true,
    })
    .then((value) => {
          switch(value) {
              case true:
                this._http.delete(this.APP_URL+"/memberdata?id="+id)
                .subscribe({
                next: data => {
                          this.myResponse = data;
                          swal("Success!!", this.myResponse.message, "success");
                          this.ngOnInit();
                        },
                error: error => {
                this.myResponse = null;
                console.log('Error occured', error);
                }});
                  break;
              case false:
                  break;
          }
    });
  }
}