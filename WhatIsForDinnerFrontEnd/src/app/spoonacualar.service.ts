import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe, RecipeSearchResult, Result } from './recipe';
import { Ingredient } from './ingredient';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SpoonacualarService {

  url: string = "https://localhost:7114/api/Spoonacular";

  constructor(private http:HttpClient) { }
  
 
  getRecipe(id:number){
    return this.http.get<Recipe>(this.url + "/Recipe/" + id)
  }

  getIngredient(id:number){
    return this.http.get<Ingredient>(this.url + "/Ingredient/" + id)
  }
   
  getAllRecipe():Observable<any>{
    return this.http.get<RecipeSearchResult>(this.url);
  }



}
