import { Component, Input, OnInit } from '@angular/core';
import { AnalyzedInstructions, ExtendedIngredient, Recipe, Step } from '../recipe';
import { SpoonacualarService } from '../spoonacualar.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit{

  ingredients:ExtendedIngredient[]=[];
  analyzedInstructionsList: AnalyzedInstructions[]=[];
  steps:Step[]=[];

  constructor(private spoonacualarService:SpoonacualarService,private accountService:AccountService){
    this.spoonacualarService.GetExtendedingredients(this.displayRecipe.id).subscribe(
      (result:ExtendedIngredient[])=>{
        this.ingredients=result;
        console.log(this.displayRecipe.id);
      }
    )
    this.spoonacualarService.GetSteps(this.displayRecipe.id).subscribe(
      (result:Step[])=>{
        this.steps=result;
        console.log(result);
      }
    )
    
  }

  ngOnInit(): void {
    
  }
  
  // getSteps(){
  //   this.spoonacualarService.GetAnalizedInstructions(this.displayRecipe.id).subscribe(
  //     (result:AnalyzedInstructions[])=>{
  //       this.analyzedInstructionsList=result;
  //       for(let i=0;i<this.analyzedInstructionsList.length;i++){
  //        this.steps=this.analyzedInstructionsList[i].steps;
  //       }
  //       console.log(result);
  //     }
  //   )
  // }



  @Input() displayRecipe:Recipe={} as Recipe;


}
