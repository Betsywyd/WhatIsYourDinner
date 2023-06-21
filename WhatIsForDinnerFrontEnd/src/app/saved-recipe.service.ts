import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SavedRecipe } from './saved-recipe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SavedRecipeService {
url:string="https://localhost:7114/api/SavedRecipes";
// https://localhost:7114/api/SavedRecipes/RecipeId/3

  constructor(private http:HttpClient) { }

  getAllSavedRecipe():Observable<SavedRecipe[]>{
    return this.http.get<SavedRecipe[]>(this.url)
  }

  getSavedRecipeById(id:number):Observable<SavedRecipe> {
    return this.http.get<SavedRecipe>(this.url + "/" + id);
  }
 
  addSavedRecipe(newValue:SavedRecipe):Observable<any> {
    return this.http.post<void>(this.url, newValue);
  }
 
  putSavedRecipe(id:number, newValue:SavedRecipe):Observable<any> {
    return this.http.put<any>(this.url + "/" + id, newValue);
  }
  
  deleteSavedRecipe(id:number):Observable<any> {
    return this.http.delete<any>(this.url + "/" + id);
  }

  GetSavedRecipeByRecipeId(recipeId:number):Observable<SavedRecipe>{
    return this.http.get<SavedRecipe>(this.url+"/SavedRecipe/"+recipeId)
  }

  GetRecipeIdBySavedRecipeId(savedRecipeId:number):Observable<number>{
    return this.http.get<number>(this.url+"/RecipeId/"+savedRecipeId)
  }


}
