import { Component, OnInit } from '@angular/core';
import { AccountService } from './account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'WhatIsForDinnerFrontEnd';

  logIn:boolean=false;

  constructor(private accountService:AccountService){
   
  }
  ngOnInit(): void {
    this.logIn=this.accountService.currentAccountLogedIn;

  }
  
  checkLogIn(){
    return this.accountService.currentAccountLogedIn;
  }

 

}
