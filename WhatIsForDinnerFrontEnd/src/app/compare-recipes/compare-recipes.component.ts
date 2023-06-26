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
  
  ingredients:Ingredient[] = [];
  totalPrices:number[] = [];
  
  
  
  constructor(private spoonacularApi:SpoonacualarService,private route:ActivatedRoute){}
  
  ngOnInit(): void {

    this.comparedRecipeIds = this.spoonacularApi.getCompareRecipeIds();
    
    console.log(this.comparedRecipeIds);
    for(let i = 0; i < this.comparedRecipeIds.length; i++){
      this.spoonacularApi.getRecipe(this.comparedRecipeIds[i]).subscribe(
        (result1:Recipe) => {
          this.recipe = result1;
          console.log(this.recipe);
          this.comparedRecipes.push(result1);
        });
          
          // for(let i = 0; i < this.recipe.extendedIngredients.length; i++){
          //   this.spoonacularApi.getIngredient(this.recipe.extendedIngredients[i].id).subscribe(
          //     (result2:Ingredient) => {
          //       if(result2.estimatedCost != null || result2.estimatedCost != undefined){
          //       result1.extendedIngredients[i].price = result2.estimatedCost.value;
          //       result1.extendedIngredients[i].priceUnit = result2.estimatedCost.unit;
          //     }
          //     else{
          //       result1.extendedIngredients[i].price = 0;
          //       result1.extendedIngredients[i].priceUnit = "";
          //     }
                // this.ingredients.push(result);
                // console.log(this.ingredients);
              //}
            
          }
          }
        
        
    }

    
  

