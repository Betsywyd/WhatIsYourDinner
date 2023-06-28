import { Component, OnInit } from '@angular/core';
import { SavedRecipe } from '../saved-recipe';
import { SavedRecipeService } from '../saved-recipe.service';
import { SpoonacualarService } from '../spoonacualar.service';
import { Recipe } from '../recipe';
import { Favorite } from '../favorite';
import { AccountService } from '../account.service';
import { Account } from '../account';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-saved-recipe',
  templateUrl: './saved-recipe.component.html',
  styleUrls: ['./saved-recipe.component.css']
})
export class SavedRecipeComponent implements OnInit {

savedRecipeList:SavedRecipe[]=[];
showRecipeDetails:boolean=false;
selectedRecipe:SavedRecipe={} as SavedRecipe;
// selectedRecipe:Recipe={} as Recipe;
account:Account={} as Account;
accountFavorites:Favorite[]=[];
existInFavorite:boolean=false;
accountSavedRecipes:SavedRecipe[]=[];
instructions:string[] = [];
ingredients:string[] = [];

constructor(private savedRecipeService:SavedRecipeService,private spoonacualarService:SpoonacualarService,private accountService:AccountService,private favoriteService:FavoritesService){}

  ngOnInit(): void {
  //  for(let i=0;i<20;i++)
  //  this.savedRecipeService.getSavedRecipeById(i).subscribe(
  //   (result:SavedRecipe)=>{
  //     this.savedRecipeList.push(result);
  //   }
  //  )
  this.savedRecipeService.getAllSavedRecipe().subscribe(
    (result:SavedRecipe[])=>{
      this.savedRecipeList=result;
    }
  )
  this.account=this.accountService.currentAccount;
  }

 
  // getSavedRecipeDetails(id:number){
  //   this.savedRecipeService.getSavedRecipeById(id).subscribe(
  //     (result:SavedRecipe)=>{
  //      this.selectedSavedRecipe=result;
  //      this.showDetails=true;
  //     }
  //   );
  // }

  // getRecipeDetails(id:number){
  //   this.savedRecipeService.GetRecipeIdBySavedRecipeId(id).subscribe(
  //     (result:number)=>{
  //       this.spoonacualarService.getRecipe(result).subscribe(
  //         (result:Recipe)=>{
  //           this.selectedRecipe=result;
  //           this.showRecipeDetails=true;
  //         }
  //       )
  //     }
  //     ) 
  // }

 




  getRecipeDetails(id:number){
    this.savedRecipeService.getSavedRecipeById(id).subscribe(
      (result:SavedRecipe)=>{
        this.selectedRecipe=result;
        this.ingredients = result.ingredients.split("\n");
        if(this.selectedRecipe.analizedInstructions !== undefined){
        this.instructions = result.analizedInstructions.split("@");
        }
        else{
          this.instructions = [];
        }
      }
     
    )
    this.showRecipeDetails=true;      
  }

  addToFavorites(savedRecipeId:number, accountId:number){
  
   this.favoriteService.PostFavoriteBySavedRecipeId(savedRecipeId,accountId).subscribe(
    (result)=>{
      this.accountFavorites.push(result);
    }
   )


  }

  backRecipe(){
    this.showRecipeDetails=false;
  }
  
  // checkInFavorites(savedRecipeId:number, accountId:number){
  // this.favoriteService.getAccountFav(accountId).subscribe(
  //   (result:SavedRecipe[])=>{
  //     this.accountSavedRecipes=result;
  //   }
  // )
  // let accountSavedRecipesIds:number[]=[];
  // for(let i=0;i<this.accountSavedRecipes.length;i++){
  //  accountSavedRecipesIds.push(this.accountSavedRecipes[i].recipeId)
  // }
  // }
 



}
