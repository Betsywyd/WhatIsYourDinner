import { Component, Input, OnInit } from '@angular/core';
import { ExtendedIngredient, Recipe } from '../recipe';
import { SpoonacualarService } from '../spoonacualar.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit{

  ingredients:ExtendedIngredient[]=[];

  constructor(private spoonacualarService:SpoonacualarService){

  }

  ngOnInit(): void {
    this.spoonacualarService.GetExtendedingredients(this.displayRecipe.id).subscribe(
      (result:ExtendedIngredient[])=>{
        this.ingredients=result;
        console.log(this.displayRecipe.id);
      }
    )
  }

  @Input() displayRecipe:Recipe={} as Recipe;

}
