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
 

constructor(private accountService:AccountService){}
  

  ngOnInit(): void {
    if(this.accountService.currentAccountLogedIn==true){
      this.logInAccount=this.accountService.currentAccount;
      this.logedIn=true;
    }
    this.accountService.getAllAccounts().subscribe(
      (result)=>{
        console.log(result);
        this.accountList = result;
       
      }
    );
  }



checkAccount():boolean{
 
  for(let i=0;i<this.accountList.length;i++)
  {
    if(this.logInAccount.name==this.accountList[i].name&&this.logInAccount.email==this.accountList[i].email&&this.logInAccount.password==this.accountList[i].password){
      this.accountService.currentAccount=this.accountList[i];
     return true;
    } 
  }
  return false;
}

logIn(){
  if(this.checkAccount()==true){
   
    this.accountService.currentAccountLogedIn=true;
    this.checkExist=false;
    this.welcome=true;
  
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
  this.logInAccount={} as Account;

}



}


