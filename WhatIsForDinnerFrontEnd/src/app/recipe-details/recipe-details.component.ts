import { Component, Input, OnInit } from '@angular/core';
import { AnalyzedInstructions, ExtendedIngredient, Recipe, Step } from '../recipe';
import { SpoonacualarService } from '../spoonacualar.service';
import { AccountService } from '../account.service';
import { SavedRecipe } from '../saved-recipe';
import { SavedRecipeService } from '../saved-recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit{

  // ingredients:ExtendedIngredient[]=[];
  // analyzedInstructionsList: AnalyzedInstructions[]=[];
  // steps:Step[]=[];
  displaySavedRecipe:SavedRecipe={} as SavedRecipe;

  constructor(private spoonacualarService:SpoonacualarService,private accountService:AccountService,private savedRecipeService:SavedRecipeService){
   this.savedRecipeService.getSavedRecipeById(this.displayRecipe.id).subscribe(
    (result:SavedRecipe)=>{
      this.displaySavedRecipe=result;

    }
   )
    
  }

  ngOnInit(): void {
    // this.spoonacualarService.GetExtendedingredients(this.displayRecipe.id).subscribe(
    //   (result:ExtendedIngredient[])=>{
    //     this.ingredients=result;
    //     console.log(this.displayRecipe.id);
    //     console.log(result);
    //   }
    // )
    // this.spoonacualarService.GetSteps(this.displayRecipe.id).subscribe(
    //   (result:Step[])=>{
    //     this.steps=result;
    //     console.log(result);
    //   }
    // )
    // this.savedRecipeService.GetSavedRecipeByRecipeId(this.displayRecipe.id).subscribe(
    //   (result:SavedRecipe)=>{
    //     this.displaySavedRecipe=result;
  
    //   }
    //  )
  }

  @Input()  displayRecipe:SavedRecipe={} as SavedRecipe;
             
            // displayRecipe:Recipe={} as Recipe;
            
}
