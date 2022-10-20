import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lma-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  pageTitle: string = 'Library Management Application';
  side = "0px";
  get staticLogin()
  {
     return sessionStorage.getItem("loginSuccess");
  }

  get staticAdmin()
  {
    return sessionStorage.getItem("isAdmin");
  }

  toggleNav(sidenav: HTMLDivElement, header: HTMLElement, body: HTMLElement) {
    if(sidenav.style.width == "250px") {
      this.side = "0px";
      sidenav.style.width = "0px";
      body.style.marginLeft = "0px";
    }
    else if(this.staticLogin==='true'){
      this.side = "250px";
      sidenav.style.width = "250px";
      body.style.marginLeft = "250px";
    }
  }

  toggleNav2(sidenav: HTMLDivElement, header: HTMLElement, body: HTMLElement)
  {
    if(this.side=="250px")
    {
      this.toggleNav(sidenav, header, body);
    }
  }

}
