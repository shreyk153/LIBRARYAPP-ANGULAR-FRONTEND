import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import * as _swal from 'sweetAlert';
import { SweetAlert } from "sweetalert/typings/core";

const swal: SweetAlert = _swal as any;

@Component({
    selector: 'lma-books',
    templateUrl: './booklist.component.html',
    styleUrls: ['./booklist.component.css']
})
export class BookListComponent implements OnInit
{
    pageTitle: string = 'Book List';
    filter: string = "";
    value: any;
    min = 0;
    max = 0;
    priceSelected: boolean = false;
    noFilterSelected: boolean = true;

    urlAdd: string = "";
    myResponse: any;
    readonly APP_URL = 'http://localhost:8091/LibraryApp';
  
    constructor(private _http: HttpClient) { }

    ngOnInit(): void 
    {
      this.myResponse = null;
    }

    get staticAdmin()
    {
      return sessionStorage.getItem("isAdmin");
    }
    
    optionSelect(): void
    {
      if (this.filter=='any') this.noFilterSelected = true;
      else this.noFilterSelected = false;

      if (this.filter=='price') this.priceSelected = true;
      else this.priceSelected = false;
    }

    getAllBooks(): void
    {
      if(this.min==null||this.max==null)
      {
        this.min = 0;
        this.max = 0;
      }

      if(this.filter=='isbn'&& isNaN(Number(this.value)))
      {
        swal("Error!!", "Please enter a number", 'error');
        this.value = 0;
      }
      else
      {
        switch(this.filter)
        {
        case 'isbn': this.urlAdd = '?isbn='+this.value;
                      break;
        case 'author': this.urlAdd = '?author='+this.value;
                      break;
        case 'genre': this.urlAdd = '?genre='+this.value;
                      break;
        case 'title': this.urlAdd = '?key='+this.value;
                      break;
        case 'price': this.urlAdd = '?min='+this.min+'&max='+this.max;
                      break;
        }


      this._http.get(this.APP_URL + '/getby'+ this.filter + this.urlAdd).subscribe({
        next: data => {
          this.myResponse = data;
          swal("Success!!", "Books Found.", 'success');
        },
        error: error => {
          this.myResponse = null;
          console.log('Error occured', error);
        }});
      }
    }

    borrowBook(isbn: number)
    {
      const id = sessionStorage.getItem("membershipId");
      this._http.post(this.APP_URL + '/borrowbook?membershipId='+id+'&isbn='+isbn, null).subscribe({
        next: data => {
          this.myResponse = data;
          swal("Success!!", this.myResponse.message , 'success');
        },
        error: error => {
          this.myResponse = null;
          console.log('Error occured', error);
        }});
    }
}