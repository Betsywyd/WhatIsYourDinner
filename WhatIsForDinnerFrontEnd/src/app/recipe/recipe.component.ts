import { Component, OnInit } from '@angular/core';
import { SpoonacualarService } from '../spoonacualar.service';
import { Recipe, RecipeSearchResult, Result } from '../recipe';
import { AccountService } from '../account.service';
import { FavoritesService } from '../favorites.service';
import { Favorite } from '../favorite';
import { SavedRecipe } from '../saved-recipe';
import { Account } from '../account';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit{
welcome:boolean=true;
results:Result[]=[];
input:string="";
selectedRecipe: Recipe={} as Recipe;
showRecipeDetails:boolean=false;
// favRecipe:Recipe={} as Recipe;
accountFavorites:Favorite[]=[];
account:Account={} as Account;
// check:boolean=false;




constructor(private spoonacualarService:SpoonacualarService,private accountService:AccountService,private favoriteService:FavoritesService){}
  ngOnInit(): void {
    this.welcome=this.accountService.currentAccountLogedIn;
    this.account=this.accountService.currentAccount;
    console.log(this.accountService.currentAccount);
  // this.favoriteService.getFavoritesByAccountId(this.accountService.currentAccount.id).subscribe(
  //   (result)=>{
  //     // let accountFavRecipes:
      
  //     // this.accountFavorites=result;
  //   }
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


      logOut(){
        this.accountService.currentAccountLogedIn=false;
        this.welcome=false;
      }
      getCurrentAccountName():string{
       return this.accountService.currentAccount.name;
       console.log(this.accountService.currentAccount.name)
      }

      

    addToFavorites(recipeId:number){
      // let check=this.CheckExistInSavedRecipe(recipeId);
      // if(this.check==true){
        let newFavorite:Favorite ={id:0,accountId:this.accountService.currentAccount.id,recipeId:recipeId, account:null};
        console.log(this.accountService.currentAccount.id);
        console.log(recipeId);
  
        console.log(newFavorite);
        this.favoriteService.addFavorite(newFavorite).subscribe(
        ()=>{
          this.accountFavorites.push(newFavorite);
        }
       )
    //   }
    //   else{
    // this.
    //   }
      
    }
  

    backRecipe(){
      this.showRecipeDetails=false;
    }

    // CheckIfExistInSavedRecipe(recipeId:number){
    //   this.spoonacualarService.CheckExistInSavedRecipe(recipeId).subscribe(
    //     (result:boolean)=>{
    //      this.check=result;
    //     }
    //   );
    // }

}
