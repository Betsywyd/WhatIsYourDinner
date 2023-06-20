import { Component, OnInit } from '@angular/core';
import { SpoonacualarService } from '../spoonacualar.service';
import { Recipe, RecipeSearchResult, Result } from '../recipe';
import { AccountService } from '../account.service';
import { FavoritesService } from '../favorites.service';
import { Favorite } from '../favorite';
import { SavedRecipe } from '../saved-recipe';
import { Account } from '../account';
import { NavigationExtras, Router } from '@angular/router';

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
comparedRecipeIds:number[] = [];
compareMaximum:number = 4;
compareIsMaxed:boolean = false; 
isCompared:boolean = false;


constructor(private spoonacualarService:SpoonacualarService,private accountService:AccountService,private favoriteService:FavoritesService, private router:Router){}
  ngOnInit(): void {
    this.welcome=this.accountService.currentAccountLogedIn;
    this.account=this.accountService.currentAccount;
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

    
    addRecipeToCompareList(recipeId:number){
      if(this.comparedRecipeIds.length < this.compareMaximum){
        this.comparedRecipeIds.push(recipeId);
        this.spoonacualarService.comparedRecipeIds = this.comparedRecipeIds;
        this.isCompared = true;
      }
      else if(this.comparedRecipeIds.length = this.compareMaximum){
        this.compareIsMaxed = true; 
      }
      console.log(this.comparedRecipeIds);
      
    }

    // removeRecipeFromCompareList(recipeId:number){
    //   for(let i = 0; i < this.comparedRecipeIds.length; i++){
    //     if(recipeId = this.comparedRecipeIds[i]){
    //       this.comparedRecipeIds.splice(i);
    //       this.isCompared = false;
    //     }
    //   }
    // }
    
    

      logOut(){
        this.accountService.currentAccountLogedIn=false;
        this.welcome=false;
      }
      getCurrentAccountName():string{
       return this.accountService.currentAccount.name;
       console.log(this.accountService.currentAccount.name)
      }

    // addToFavorites(recipeId:number){
    //   let newFavorite:Favorite ={id:0,accountId:this.accountService.currentAccount.id,recipeId:recipeId, account:null};
    //  this.favoriteService.addFavorite(newFavorite).subscribe(
    //   (result:Favorite)=>{
    //     this.accountFavorites.push(newFavorite);
    //   }
    //  )
     

    // }

    backRecipe(){
      this.showRecipeDetails=false;
    }
  

}
