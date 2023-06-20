import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  currentAccount:Account = {} as Account;
  currentAccountLogedIn:boolean= false;
  passWordChange:boolean=false;




  url: string="https://localhost:7114/api/Accounts";
  constructor(private http:HttpClient) { }

  getAllAccounts():Observable<Account[]>{
    return this.http.get<Account[]>(this.url)
  }

  getAccountById(id:number):Observable<Account> {
    return this.http.get<Account>(this.url + "/" + id);
  }
 
  createAccount(user:Account):Observable<void> {
    return this.http.post<void>(this.url, user);
  }
 
  putAccount(id:number, newValue:Account):Observable<any> {
    return this.http.put<any>(this.url + "/" + id, newValue);
  }
  
  deleteAccount(id:number):Observable<any> {
    return this.http.delete<any>(this.url + "/" + id);
  }
















}
