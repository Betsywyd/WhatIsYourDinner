import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{
  logInAccount:Account={} as Account;
  accountList:Account[]=[];
 
  checkExist:boolean=false;
  logedIn:boolean=false;
  welcome:boolean=false;
  // checkOut:boolean=true;

constructor(private accountService:AccountService){}
  

  ngOnInit(): void {
    this.accountService.getAllAccounts().subscribe(
      (result)=>{
        this.accountList = result;
      }
    );
  }



checkAccount():boolean{
 
  for(let i=0;i<this.accountList.length;i++)
  {
    if(this.logInAccount.name==this.accountList[i].name&&this.logInAccount.email==this.accountList[i].email&&this.logInAccount.password==this.accountList[i].password){
     return true;
    } 
  }
  return false;
}

logIn(){
  if(this.checkAccount()==true){
    this.accountService.currentAccount=this.logInAccount;
    this.accountService.currentAccountLogedIn=true;
    this.checkExist=false;
    this.welcome=true;
    // this.checkOut=false;
    console.log(this.accountService.currentAccountLogedIn)
  }
  else{
    this.checkExist=true;
  }
}

logOut(){
  this.accountService.currentAccountLogedIn=false;
  this.checkExist=false;
  this.welcome=false;
  // this.checkOut=false;
}

}


