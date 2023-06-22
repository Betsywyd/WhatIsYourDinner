import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../favorites.service';
import { Favorite } from '../favorite';
import { AccountService } from '../account.service';
import { SavedRecipe } from '../saved-recipe';
import { SavedRecipeService } from '../saved-recipe.service';
import { SpoonacualarService } from '../spoonacualar.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit{

 favoritesSavedRecipes:SavedRecipe[]=[];
 currentAccountFav:number[]=[];
 showRecipeDetails:boolean=false;
 selectedRecipe: Recipe={} as Recipe;
 
  constructor(private favoriteService:FavoritesService,private accountService:AccountService,private savedRecipeService:SavedRecipeService,private spoonacualarService:SpoonacualarService){};
  ngOnInit(): void {
    let id:number=this.accountService.currentAccount.id;
    console.log(id);
    this.favoriteService.getAccountFav(id).subscribe(
      (result:SavedRecipe[])=>{
        this.favoritesSavedRecipes=result;
        console.log(result);
      }
    );
  }

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
