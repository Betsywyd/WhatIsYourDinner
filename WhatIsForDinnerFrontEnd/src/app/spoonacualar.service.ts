import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  AnalyzedInstructions, ExtendedIngredient, Recipe, RecipeSearchResult, Result, Step } from './recipe';
import { Ingredient } from './ingredient';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SpoonacualarService {

  url: string = "https://localhost:7114/api/Spoonacular";

 

  comparedRecipeIds:number[] = [];
//  9b0ec7fd2f72cd86d1b65ab09d86e805d3415fe0

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


  GetSteps(recipeId:number):Observable<any>{
    return this.http.get<Step[]>(this.url+"/GetSteps/"+recipeId)
  }

  CheckExistInSavedRecipe(recipeId:number):Observable<boolean>{
    return this.http.get<boolean>(this.url+"/CheckExistInSavedRecipe/"+recipeId)
  }

  GetSavedRecipeIdByRecipeId(recipeId:number):Observable<number>{
    return this.http.get<number>(this.url+"/SavedRecipeId/"+recipeId)
  }

  FillSavedRecipeDb(recipeId:number):Observable<any>{
    return this.http.get<any>(this.url+"/FillByRecipeId/"+recipeId)
  }


  getCompareRecipeIds():number[]{
    return this.comparedRecipeIds;
//  9b0ec7fd2f72cd86d1b65ab09d86e805d3415fe0
  }

}
