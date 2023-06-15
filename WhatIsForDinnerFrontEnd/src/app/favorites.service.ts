import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favorite } from './favorite';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  url: string="https://localhost:7114/api/Favorites";
  constructor(private http:HttpClient) { }

  getAllAccounts():Observable<Favorite>{
    return this.http.get<Favorite>(this.url)
  }

  getAccountById(id:number):Observable<Favorite> {
    return this.http.get<Favorite>(this.url + "/" + id);
  }
 
  createAccount(user:Favorite):Observable<void> {
    return this.http.post<void>(this.url, user);
  }
 
  putAccount(id:number, newValue:Favorite):Observable<any> {
    return this.http.put<any>(this.url + "/" + id, newValue);
  }
  
  deleteAccount(id:number):Observable<any> {
    return this.http.delete<any>(this.url + "/" + id);
  }
}
