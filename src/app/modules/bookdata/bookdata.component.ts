import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { LoginGuard } from 'src/app/app-routing.module';
import { Router } from '@angular/router';
import { IBookDto } from './bookdata';
import * as _swal from 'sweetAlert';
import { SweetAlert } from "sweetalert/typings/core";

const swal: SweetAlert = _swal as any;

@Component({
  selector: 'lma-book-form',
  templateUrl: './bookdata.component.html',
  styleUrls: ['./bookdata.component.css']
})

export class BookDataComponent implements OnInit {

book: IBookDto = {
  isbn: 0,
  title: '',
  genre: '',
  authors: '',
  price: 0,
  quantityAvailable: 0
}

myResponse: any;
readonly APP_URL = 'http://localhost:8091/LibraryApp';

constructor(private _http: HttpClient, private _router: Router) { }

get staticLogin()
{
  return sessionStorage.getItem("loginSuccess");
}

fetch()
{
  this._http.get(this.APP_URL+"/getbyisbn?isbn="+this.book.isbn).subscribe({
    next: data => {
      this.myResponse = data;
      console.log("bookdata visited");
      this.book.isbn = this.myResponse[0].isbn;
      this.book.title = this.myResponse[0].title;
      this.book.genre = this.myResponse[0].genre;
      this.book.authors = this.myResponse[0].authors;
      this.book.price = this.myResponse[0].price;
      this.book.quantityAvailable = this.myResponse[0].quantityAvailable;
    },
    error: error => {
      this.myResponse = null;
      this.book = {
        isbn: this.book.isbn,
        title: '',
        genre: '',
        authors: '',
        price: 0,
        quantityAvailable: 0
      }
      console.log('Error occured', error);
    }});
}

ngOnInit(): void 
{
  this.book = {
    isbn: 0,
    title: '',
    genre: '',
    authors: '',
    price: 0,
    quantityAvailable: 0
  }
}

onSubmit(form: NgForm) 
{
    this._http.post(this.APP_URL+"/bookdata", this.book).subscribe({
    next: data => {
      this.myResponse = data;
      swal("Success!!", this.myResponse.message , 'success');
    },
    error: error => {
      this.myResponse = null;
      console.log('Error occured', error);
    }});
    this.book = {
      isbn: 0,
      title: '',
      genre: '',
      authors: '',
      price: 0,
      quantityAvailable: 0
    }
}

onBlur(field: NgModel) 
{}

delete()
{
  swal({
    title: "Are you sure?",
    text: "Book will be deleted.",
    icon: "warning",
    dangerMode: true,
  })
  .then((value) => {
        switch(value) {
            case true:
              this._http.delete(this.APP_URL+"/bookdata?isbn="+this.book.isbn)
              .subscribe({
                next: data => {
                  this.myResponse = data;
                  swal("Success!!", this.myResponse.message , 'success');
                },
                error: error => {
                  this.myResponse = null;
                  console.log('Error occured', error);
                }});
              this.book = {
                  isbn: 0,
                  title: '',
                  genre: '',
                  authors: '',
                  price: 0,
                  quantityAvailable: 0
                }
                break;
            case false:
                break;
        }
  });
}
}
