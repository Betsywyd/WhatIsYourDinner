import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit{
  accountToChange:Account={} as Account;
  accountList:Account[]=[];
  changFinished:boolean=false;
  passwordIsChanging:boolean=false;

  constructor(private accountService:AccountService){}

ngOnInit(): void {
  
  this.accountService.getAllAccounts().subscribe(
    (result)=>{
      console.log(result);
      this.accountList = result;
     
    }
  );
}


finishChanging():void{
  let accountToChange={id:this.accountService.currentAccount.id,name:this.accountService.currentAccount.name,email:this.accountService.currentAccount.email,password:this.accountToChange.password,favorites:this.accountService.currentAccount.favorites}
  this.accountService.putAccount(this.accountService.currentAccount.id,accountToChange).subscribe(
    ()=>{
    }
  )
  
  this.changFinished=true;
  this.passwordIsChanging=false;
  this.accountService.getAllAccounts().subscribe(
    (result)=>{
      console.log(result);
      this.accountList = result;
     
    }
  );
}

toggleDisplay(){
  this.passwordIsChanging=!this.passwordIsChanging;
}
} 




