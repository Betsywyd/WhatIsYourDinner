import { Component, OnInit } from '@angular/core';
import { SpoonacualarService } from '../spoonacualar.service';
import { Recipe, Result } from '../recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit{
results:Result[]=[];



constructor(private spoonacualarService:SpoonacualarService){}
  ngOnInit(): void {
    this.spoonacualarService.getAllRecipe().subscribe(
      (result)=>{
        this.results=result.Result;
      }
    )

  



  
}
}
