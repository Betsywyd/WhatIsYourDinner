import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favorite } from './favorite';
import { Recipe } from './recipe';
import { SavedRecipe } from './saved-recipe';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  url: string="https://localhost:7114/api/Favorites";

 
  constructor(private http:HttpClient) { }

  getAllFavorites():Observable<Favorite[]>{
    return this.http.get<Favorite[]>(this.url)
  }

  getFavoriteById(id:number):Observable<Favorite> {
    return this.http.get<Favorite>(this.url + "/" + id);
  }
 
  // addFavorite(newValue:Favorite):Observable<any> {
  //   return this.http.post<Favorite>(this.url, newValue);
  // }
 
  putFavorite(id:number, newValue:Favorite):Observable<any> {
    return this.http.put<any>(this.url + "/" + id, newValue);
  }
  
  deleteFavorite(id:number):Observable<any> {
    return this.http.delete<any>(this.url + "/" + id);
  }

  // getFavoritesByAccountId(accountId:number):Observable<SavedRecipe[]>{
  //   return this.http.get<SavedRecipe[]>(this.url+"/AccountFav/"+accountId)
  // }
 
  getAccountFav(accountId:number):Observable<SavedRecipe[]>{
    return this.http.get<SavedRecipe[]>(this.url+"/AccountFav/"+accountId)
  }

  addALLToFavorites(recipeId:number):Observable<Favorite>{
    return this.http.post<Favorite>(this.url + "/CreateFavorite/" + recipeId, {})
  }

}
