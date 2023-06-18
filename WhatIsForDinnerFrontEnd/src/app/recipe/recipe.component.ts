import { Component, OnInit } from '@angular/core';
import { SpoonacualarService } from '../spoonacualar.service';
import { Recipe, RecipeSearchResult, Result } from '../recipe';
import { AccountService } from '../account.service';
import { FavoritesService } from '../favorites.service';
import { Favorite } from '../favorite';
import { SavedRecipe } from '../saved-recipe';

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
// favRecipe:Recipe={} as Recipe;
accountFavorites:Favorite[]=[];



constructor(private spoonacualarService:SpoonacualarService,private accountService:AccountService,private favoriteService:FavoritesService){}
  ngOnInit(): void {
    console.log(this.accountService.currentAccount);
  // this.favoriteService.getFavoritesByAccountId(this.accountService.currentAccount.id).subscribe(
  //   (result)=>{
  //     let accountFavRecipes:
      
  //     this.accountFavorites=result;}
  // );

  }
    
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


    // addToFavorites(recipeId:number){
    //   let newFavorite:Favorite ={id:0,accountId:this.accountService.currentAccount.id,recipeId:recipeId, account:null};
    //  this.favoriteService.addFavorite(newFavorite).subscribe(
    //   (result:Favorite)=>{
    //     this.accountFavorites.push(newFavorite);
    //   }
    //  )
     

    // }

  

}
