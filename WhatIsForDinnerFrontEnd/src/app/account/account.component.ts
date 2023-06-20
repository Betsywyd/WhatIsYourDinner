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

  welcome:boolean=false;
  finishDelete:boolean=false;
  id:number=-1;
  index:number=-1;
  

constructor(private accountService:AccountService){}
  
  ngOnInit(): void {
  
    // if(this.accountService.currentAccountLogedIn==true){
    //   this.logInAccount=this.accountService.currentAccount;
    //   this.logedIn=true;
    // }
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
      this.id=this.accountList[i].id;
      this.index=i;
     return true;
    } 
  }
  return false;
}

logIn(){
  this.accountService.getAllAccounts().subscribe(
    (result)=>{
      console.log(result);
      this.accountList = result;
     
    }
  );
  if(this.checkAccount()==true){
   
    this.accountService.currentAccountLogedIn=true;
    this.checkExist=false;
    this.welcome=true;
    this.logInAccount={} as Account;
    this.finishDelete=false;
    console.log(this.accountService.currentAccountLogedIn)
  }
  else{
    this.checkExist=true;
    this.logInAccount={} as Account;
    this.finishDelete=false;
  }
}

logOut(){
  this.accountService.currentAccountLogedIn=false;
  this.checkExist=false;
  this.welcome=false;
  this.logInAccount={} as Account;

}

getCurrentAccountName():string{
  return this.accountService.currentAccount.name;
}


deleteAccount():void{
this.accountService.deleteAccount(this.id).subscribe(
  ()=>{
    this.accountList.slice(this.index,1);
    this.accountService.getAllAccounts().subscribe(
      (result)=>{
        console.log(result);
        this.accountList = result;
       
      }
    );
  }
)
this.finishDelete=true;
this.accountService.currentAccountLogedIn=false;
this.checkExist=false;
this.welcome=false;

}

deletedAccountName():string{
return this.accountService.currentAccount.name;
}



}


