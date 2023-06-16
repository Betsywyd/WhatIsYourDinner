import { Component, OnInit } from '@angular/core';
import { SpoonacualarService } from '../spoonacualar.service';
import { Recipe, RecipeSearchResult, Result } from '../recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit{
results:Result[]=[];
input:string="";
selectedRecipe: Recipe={} as Recipe;
showRecipeDetails:boolean=false;

constructor(private spoonacualarService:SpoonacualarService){}
  ngOnInit(): void {}
    
    getRecipe():void{
      this.spoonacualarService.searchRecipe(this.input).subscribe(
        (result:RecipeSearchResult)=>{
          this.results=result.results;
          console.log(result);
        }
      );
  
    }

    getRecipeDetails(id:number){
      this.spoonacualarService.getRecipe(id).subscribe(
        (result:Recipe)=>{
          this.selectedRecipe=result;
          this.showRecipeDetails=true;
        }
      )
    }


    addToFavorites(){
      // let f:Favorite={}
     


    }

  

}
