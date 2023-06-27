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
  
  
  @Input()  displayRecipe:SavedRecipe={} as SavedRecipe;
  @Input()  instructions:string[] = [];
  @Input() ingredients:string[] = [];
  // instructions:string[] = this.displayRecipe.analizedInstructions.split(",");

  constructor(private spoonacualarService:SpoonacualarService,private accountService:AccountService,private savedRecipeService:SavedRecipeService){
    
    console.log(this.displayRecipe);
    console.log(this.instructions);
    
  }

  
  ngOnInit(): void {

    console.log(this.instructions);
    // this.savedRecipeService.getSavedRecipeById(this.displayRecipe.id).subscribe(
    //  (result:SavedRecipe)=>{
    //    this.displayRecipe=result;
      //  let inst:string[] = this.displayRecipe.analizedInstructions.split(",");
      //  for(let i = 0; i < inst.length; i++){
      //    this.instructions.push(inst[i]);
      //  }
    //  }
    //)
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

             
            // displayRecipe:Recipe={} as Recipe;
            
}
