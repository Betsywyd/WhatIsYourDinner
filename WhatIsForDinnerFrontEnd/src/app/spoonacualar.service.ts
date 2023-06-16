import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  AnalyzedInstructions, ExtendedIngredient, Recipe, RecipeSearchResult, Result } from './recipe';
import { Ingredient } from './ingredient';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SpoonacualarService {

  url: string = "https://localhost:7114/api/Spoonacular";

  constructor(private http:HttpClient) { }
  
 
  getRecipe(id:number):Observable<Recipe>{
    return this.http.get<Recipe>(this.url + "/Recipe/" + id)
  }

  getIngredient(id:number):Observable<Ingredient>{
    return this.http.get<Ingredient>(this.url + "/Ingredient/" + id)
  }
   
  searchRecipe(input:string):Observable<RecipeSearchResult>{
    return this.http.get<RecipeSearchResult>(this.url+"/Search/"+input);
  }

  GetExtendedingredients(recipeId:number):Observable<any>{
    return this.http.get<ExtendedIngredient[]>(this.url+"/Getingredients/"+recipeId)
  }

  GetAnalizedInstructions(recipeId:number):Observable<any>{
    return this.http.get<AnalyzedInstructions[]>(this.url+"/Getingredients/"+recipeId)
  }

}
