import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit{
newAccount:Account={} as Account;
accountList:Account[]=[];
existAccount:boolean=false;
createSuccess:boolean=false;

constructor(private accountService:AccountService){}
  ngOnInit(): void {
   
    this.accountService.getAllAccounts().subscribe(
      (result)=>{
        this.accountList = result;
  })

  }



createAccount(){
let accontListNames:string[]=[];
let accontListEmails:string[]=[];
for(let i=0;i<this.accountList.length;i++){
  accontListNames.push(this.accountList[i].name);
  accontListEmails.push(this.accountList[i].email);
}
  if(accontListNames.includes(this.newAccount.name)||accontListEmails.includes(this.newAccount.email)){
  this.existAccount=true;
  this.createSuccess=false;
  this.newAccount={} as Account;
  }
  else(
  this.accountService.createAccount(this.newAccount).subscribe(
    ()=>{
      this.accountList.push(this.newAccount);
      this.newAccount={} as Account;
      this.createSuccess=true;
      this.existAccount=false;
    }
  )


  )

}


}
