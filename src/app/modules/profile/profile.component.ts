import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import * as _swal from 'sweetAlert';
import { SweetAlert } from "sweetalert/typings/core";
import { IMemberDto } from './profile';

const swal: SweetAlert = _swal as any;

@Component({
  selector: 'lma-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
  
export class ProfileComponent implements OnInit {

    fieldTextType: boolean = false;
    isAdminSelected: boolean = false;
    check: string = '';
  
    membershipDto: IMemberDto = {
      username: '',
      password: '',
      name: '',
      roles: '',
      phone: 0
    };
  
  myResponse: any;
  readonly APP_URL = 'http://localhost:8091/LibraryApp';
  id: string = sessionStorage.getItem('membershipId')||"{}";
  
  constructor(private _http: HttpClient, private _router: Router) { }
  
  get staticLogin()
  {
    return sessionStorage.getItem("loginSuccess");
  }
  
  
    ngOnInit(): void 
    {
      console.log("init");
      if(this.id!=="{}")
      {
        this._http.get(this.APP_URL+"/memberdata?id="+this.id).subscribe({
          next: data => {
            this.myResponse = data;
            console.log("profile page visited");
            this.membershipDto.name = this.myResponse.name;
            this.membershipDto.username = this.myResponse.username;
            this.membershipDto.password = this.myResponse.password;
            this.membershipDto.roles = this.myResponse.roles;
            this.membershipDto.phone = this.myResponse.phone;
          },
          error: error => {
            this.myResponse = null;
            console.log('Error occured', error);
          }});
      }
    }
  
    onSubmit(form: NgForm) 
    {
      console.log(this.membershipDto);
      if(this.id!=="{}")
      {
        this._http.put(this.APP_URL+"/memberdata?id="+this.id, this.membershipDto)
        .subscribe({
          next: data => {
            this.myResponse = data;
            swal("Success!!", this.myResponse.message , "success");
          },
          error: error => {
            this.myResponse = null;
            console.log('Error occured', error);
          }});
      }
      else
      {
        if(this.isAdminSelected&&this.check=='admin')
        {
        this._http.post(this.APP_URL+"/memberdata", this.membershipDto).subscribe({
          next: data => {
            this.myResponse = data;
            swal("Success!!", this.myResponse.message, "success");
            this._router.navigate(["/login"]);
          },
          error: error => {
            this.myResponse = null;
            console.log('Error occured', error);
          }});
        }
        else if(!this.isAdminSelected)
        {
          console.log('enter user data');
          this._http.post(this.APP_URL+"/memberdata", this.membershipDto).subscribe({
          next: data => {
            this.myResponse = data;
            swal("Success!!", this.myResponse.message, "success");
            this._router.navigate(["/login"]);
          },
          error: error => {
            this.myResponse = null;
            console.log('Error occured', error);
          }});
        }
      }
      
      
    }
  
    onBlur(field: NgModel) {
      console.log("OnBlur() value: " + field.valid);
    }
  
    select()
    {
      if(this.membershipDto.roles=='ROLE_ADMIN') this.isAdminSelected = true;
      else this.isAdminSelected = false;
    }
  
    toggleFieldTextType() {
      this.fieldTextType = !this.fieldTextType;
    }
  
    delete()
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
                  this._router.navigate(["/welcome"]);  
                  this._http.delete(this.APP_URL+"/memberdata?id="+this.id)
                  .subscribe({
                  next: data => {
                            this.myResponse = data;
                            swal("Success!!", this.myResponse.message, "success");
                          },
                  error: error => {
                  this.myResponse = null;
                  console.log('Error occured', error);
                  }});
                  sessionStorage.clear();
                    break;
                case false:
                    break;
            }
      });
    }
  
}