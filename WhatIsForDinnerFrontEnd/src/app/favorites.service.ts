import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favorite } from './favorite';
import { Recipe, Result } from './recipe';
import { SavedRecipe } from './saved-recipe';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  url: string=`${environment.apiUrl}/api/Favorites`;

 
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
    return this.http.get<SavedRecipe[]>(this.url+"/AccountFav/"+accountId);
  }

  addALLToFavorites(recipeId:number, accountId:number):Observable<Favorite>{
    return this.http.post<Favorite>(this.url + "/CreateFavorite/" + recipeId + "?accountId=" +accountId, {});
  }

  DeleteFavoriteBySavedRecipeId(savedRecipeId:number):Observable<any>{
    return this.http.delete<any>(this.url+"/SavedRecipe/" + savedRecipeId);
  }
  // [HttpPost("{savedRecipeId}")]

  PostFavoriteBySavedRecipeId( savedRecipeId:number, accountId:number):Observable<Favorite>{
    return this.http.post<Favorite>(this.url+"/CreateFavoriteBySavedRecipeId/"+savedRecipeId+"?accountId=" +accountId, {});
  }

  CheckIfResultIsFavorited(resultQuery:string, accountId:number):Observable<Result[]>{
    return this.http.get<Result[]>(this.url+ "/ResultsAreFavorited/" + accountId + "/" + resultQuery);
  }

}
