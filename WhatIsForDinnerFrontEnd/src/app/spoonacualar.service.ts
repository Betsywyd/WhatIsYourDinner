import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipe';
import { Ingredient } from './ingredient';
@Injectable({
  providedIn: 'root'
})
export class SpoonacualarService {

  url: string = "https://api.spoonacular.com/";

  constructor(private http:HttpClient) { }
  
  getRecipe(id:number){
    return this.http.get<Recipe>(this.url + id + "/information?includeNutrition=false")
  }

  getIngredient(id:number){
    return this.http.get<Ingredient>(this.url + "/food/ingredients/" + id + "/information?amount=1" )
  }
}
