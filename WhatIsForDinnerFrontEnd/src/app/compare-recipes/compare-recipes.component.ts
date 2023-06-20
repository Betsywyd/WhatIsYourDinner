import { Component, Input, OnInit } from '@angular/core';
import { ExtendedIngredient, Recipe } from '../recipe';
import { SpoonacualarService } from '../spoonacualar.service';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from '../ingredient';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-compare-recipes',
  templateUrl: './compare-recipes.component.html',
  styleUrls: ['./compare-recipes.component.css']
})
export class CompareRecipesComponent implements OnInit {
  
  
  comparedRecipeIds:number[] = [];
  recipe:Recipe = {} as Recipe;
  comparedRecipes:Recipe[] = [];
  recipeIngredients:ExtendedIngredient[] = [];
  totalPrice:number = 0;
  
  
  constructor(private spoonacularApi:SpoonacualarService,private route:ActivatedRoute){}
  
  ngOnInit(): void {

    this.comparedRecipeIds = this.spoonacularApi.getCompareRecipeIds();
    
    console.log(this.comparedRecipeIds);
    for(let i = 0; i < this.comparedRecipeIds.length; i++){
      this.spoonacularApi.getRecipe(this.comparedRecipeIds[i]).subscribe(
        (result) => {
          this.recipe = result;
          console.log(this.recipe);
          this.comparedRecipes.push(result);
        }
        );
      }
  }
    

  }

