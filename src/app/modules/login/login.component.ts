import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
import { Router } from "@angular/router";
import { AdminGuard, LoginGuard } from "src/app/app-routing.module";
import * as _swal from 'sweetAlert';
import { SweetAlert } from "sweetalert/typings/core";

const swal: SweetAlert = _swal as any;

@Component({
    selector: 'lma-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent
{
    fieldTextType: boolean = false;
    username = '';
    password = '';

    myResponse: any;
    readonly APP_URL = 'http://localhost:8091/LibraryApp';

    constructor(private _http: HttpClient, private _router: Router) { }

    get staticLoginSuccess()
    {
        return sessionStorage.getItem("loginSuccess");
    }

    onBlur(field: NgModel) {
        console.log("OnBlur() value: " + field.valid);
      }
    
    toggleFieldTextType() {
        this.fieldTextType = !this.fieldTextType;
      }
    
      onSubmit(form: NgForm) 
      {
        this._http.get(this.APP_URL+"/login?username="+this.username+"&password="+this.password)
        .subscribe({
            next: data => {
              this.myResponse = data;
              this._router.navigate(["/welcome"]);
              if(this.myResponse.loginSuccess)
              {
                sessionStorage.setItem("loginSuccess", "true");
                sessionStorage.setItem("membershipId", this.myResponse.membershipId);
                console.log('id set to '+this.myResponse.membershipId);
                console.log('Login successful');
                swal("Success!!", "Logged in successfully", "success");
                if(this.myResponse.admin) 
                {
                  sessionStorage.setItem("isAdmin", "true");
                  console.log('Admin Logged in');
                }
              }
            },
            error: error => {
              this.myResponse = null;
              console.log('Error occured', error);
            }
          }
        );
      }
      logout()
      {
          console.log("Logged out.");
          sessionStorage.clear();
          AdminGuard.userId = -1;
      }
}