import { Component, OnInit } from '@angular/core';
import { SavedRecipe } from '../saved-recipe';
import { SavedRecipeService } from '../saved-recipe.service';
import { SpoonacualarService } from '../spoonacualar.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-saved-recipe',
  templateUrl: './saved-recipe.component.html',
  styleUrls: ['./saved-recipe.component.css']
})
export class SavedRecipeComponent implements OnInit {

savedRecipeList:SavedRecipe[]=[];
showRecipeDetails:boolean=false;
selectedRecipe:Recipe={} as Recipe;

constructor(private savedRecipeService:SavedRecipeService,private spoonacualarService:SpoonacualarService){}

  ngOnInit(): void {
   for(let i=0;i<20;i++)
   this.savedRecipeService.getSavedRecipeById(i).subscribe(
    (result:SavedRecipe)=>{
      this.savedRecipeList.push(result);
    }
   )
  }

 
  // getSavedRecipeDetails(id:number){
  //   this.savedRecipeService.getSavedRecipeById(id).subscribe(
  //     (result:SavedRecipe)=>{
  //      this.selectedSavedRecipe=result;
  //      this.showDetails=true;
  //     }
  //   );
  // }

  getRecipeDetails(id:number){
    this.savedRecipeService.GetRecipeIdBySavedRecipeId(id).subscribe(
      (result:number)=>{
        this.spoonacualarService.getRecipe(result).subscribe(
          (result:Recipe)=>{
            this.selectedRecipe=result;
            this.showRecipeDetails=true;
          }
        )
      }
      ) 
  }

  backRecipe(){
    this.showRecipeDetails=false;
  }

}
