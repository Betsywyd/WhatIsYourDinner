import { Component, OnInit } from '@angular/core';
import { SpoonacualarService } from '../spoonacualar.service';
import { Recipe, RecipeSearchResult, Result } from '../recipe';
import { AccountService } from '../account.service';
import { FavoritesService } from '../favorites.service';
import { Favorite } from '../favorite';
import { SavedRecipe } from '../saved-recipe';
import { Account } from '../account';
import { NavigationExtras, Router } from '@angular/router';
import { SavedRecipeService } from '../saved-recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit{
welcome:boolean=true;
results:Result[]=[];
input:string="";
selectedSavedRecipe: SavedRecipe={} as SavedRecipe;
showRecipeDetails:boolean=false;
selectedRecipe:Recipe={} as Recipe;
accountFavorites:Favorite[]=[];
accountFavoritesIds:number[] = [];
account:Account={} as Account;

checkExist:boolean=false;

savedRecipeList:SavedRecipe[]=[];
comparedRecipeIds:number[] = [];
compareMaximum:number = 4;
compareIsMaxed:boolean = false; 
isCompared:boolean[] = [];
isFavorited:boolean[] = [];
instructions:string[] = [];
ingredients:string[] = [];
favoritedRecipes:SavedRecipe[] = [];

constructor(private spoonacualarService:SpoonacualarService,private accountService:AccountService,private favoriteService:FavoritesService, private router:Router,private savedRecipeService:SavedRecipeService){}
  ngOnInit(): void {

    
    // this.favoriteService.getAllFavorites().subscribe(
    //   (result) => {
    //     this.accountFavorites = result;
    //     console.log(this.accountFavorites);
        
    //   }
    //)
    this.savedRecipeService.getAllSavedRecipe().subscribe(
      (result:SavedRecipe[])=>{
        this.savedRecipeList=result;
        this.isCompared.fill(false, 0, result.length);
        

        // this.isFavorited.fill(false, 0, result.length);

        // for(let i=0; i < result.length; i++){
        //   this.checkIsFavorited(result[i].recipeId, i);
        // }
      }
     )
    this.welcome=this.accountService.currentAccountLogedIn;
    this.account=this.accountService.currentAccount;


  }



  // checkIsFavorited(recipeId:number){
  //   let check:boolean = false;
  //   for(let i =0; i < this.results.length; i++){
  //     if(this.results[i].id == recipeId){
            
  //           check = true;
  //         }
  //       }
      
      
  //     return check;
  //   }
  
  // checkIsFavorited(recipeId:number, index:number){
  //   for(let i=0; i < this.accountFavorites.length; i++){
  //     this.accountFavoritesIds.push(this.accountFavorites[i].recipeId);
  //   }
  //   if (this.accountFavoritesIds.includes(recipeId)){
  //     this.isFavorited[index] = true;
  //   }
  //   console.log(this.accountFavoritesIds);
  // }
    
  getRecipe():void{
      // this.spoonacualarService.searchRecipe(this.input).subscribe(
      //   (result:RecipeSearchResult)=>{
      //     this.results=result.results;
          // for(let i = 0; i < this.results.length; i++){
          //   if(this.results[i].id )
          // }
      //   }
      // );
  this.favoriteService.CheckIfResultIsFavorited(this.input, this.account.id).subscribe(
    (result) => {
      this.results = result;
    }
  )
  }


    displayDetails(recipeId:number){
      
      let savedRecipeListRecipeIds:number[]=[];
      for(let i=0;i<this.savedRecipeList.length;i++){
        savedRecipeListRecipeIds.push(this.savedRecipeList[i].recipeId);
      }
      if(savedRecipeListRecipeIds.includes(recipeId)){
       this.savedRecipeService.GetSavedRecipeByRecipeId(recipeId).subscribe(
        (result:SavedRecipe)=>{
          this.selectedSavedRecipe=result;
          this.ingredients = result.ingredients.split("\n");
          if(this.selectedSavedRecipe.analizedInstructions !== undefined){
          this.instructions = result.analizedInstructions.split("@");
          }
          else{
            this.instructions = [];
          }
        }
       )
      }
      else{
      this.savedRecipeService.PostSavedRecipeByRecipeId(recipeId).subscribe(
       (result)=>{
         this.savedRecipeList.push(result);
         this.selectedSavedRecipe=result;
         this.savedRecipeService.getAllSavedRecipe().subscribe(
           (result:SavedRecipe[])=>{
             this.savedRecipeList=result;
             
           }
          )
 
       }
      )
    }
      this.showRecipeDetails=true;
     }


    
    addRecipeToCompareList(recipeId:number, index:number){
      if(this.comparedRecipeIds.length < this.compareMaximum){
        this.comparedRecipeIds.push(recipeId);
        this.spoonacualarService.comparedRecipeIds = this.comparedRecipeIds;
        this.isCompared[index] = true;
      }
      else if(this.comparedRecipeIds.length = this.compareMaximum){
        this.compareIsMaxed = true; 
      }
      // console.log(this.comparedRecipeIds);
      
    }

    removeRecipeFromCompareList(recipeId:number, index:number){
      for(let i = 0; i < this.comparedRecipeIds.length; i++){
        if(recipeId = this.comparedRecipeIds[i]){
          this.comparedRecipeIds.splice(i);
          this.isCompared[index] = false;
        }
      }
    }
    
    

      logOut(){
        this.accountService.currentAccountLogedIn=false;
        this.welcome=false;
      }
      getCurrentAccountName():string{
       return this.accountService.currentAccount.name;
       console.log(this.accountService.currentAccount.name)
      }
  
    addToFavorites(recipeId:number, accountId:number, searchResult:Result){
      
      searchResult.isFavorited = true;
      this.favoriteService.addALLToFavorites(recipeId, accountId).subscribe(
        (result) => {
          console.log(result);
          this.accountFavorites.push(result);  
        }
      )
    }


    backRecipe(){
      this.showRecipeDetails=false;
    }


}
