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
// savedRecipeId:number=-1;
checkExist:boolean=false;

savedRecipeList:SavedRecipe[]=[];
comparedRecipeIds:number[] = [];
compareMaximum:number = 4;
compareIsMaxed:boolean = false; 
isCompared:boolean[] = [];
// showDetails:boolean = false;
isFavorited:boolean[] = [];
instructions:string[] = [];
ingredients:string[] = [];

constructor(private spoonacualarService:SpoonacualarService,private accountService:AccountService,private favoriteService:FavoritesService, private router:Router,private savedRecipeService:SavedRecipeService){}
  ngOnInit(): void {
    this.savedRecipeService.getAllSavedRecipe().subscribe(
      (result:SavedRecipe[])=>{
        this.savedRecipeList=result;
        this.isCompared.fill(false, 0, result.length);
        this.isFavorited.fill(false, 0, result.length);
        for(let i=0; i < result.length; i++){
          this.checkIsFavorited(result[i].recipeId, i);
          console.log(this.isFavorited[i])
        }
      }
     )
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
  checkIsFavorited(recipeId:number, index:number){
    for(let i=0; i < this.accountFavorites.length; i++){
      this.accountFavoritesIds.push(this.accountFavorites[i].recipeId);
    }
    if (this.accountFavoritesIds.includes(recipeId)){
      this.isFavorited[index] = true;
    }
    
  }

  // toggleDetails(){
  //   this.showDetails = true;
  // }
    
    getRecipe():void{
      this.spoonacualarService.searchRecipe(this.input).subscribe(
        (result:RecipeSearchResult)=>{
          this.results=result.results;
          console.log(result);
        }
      );
  
    }

    // getRecipeDetails(id:number){

    //   this.spoonacualarService.getRecipe(id).subscribe(
    //     (result:Recipe)=>{
    //       this.selectedRecipe=result;
    //       this.showRecipeDetails=true;
    //     }
    //   )
    //   this.savedRecipeService.PostSavedRecipeByRecipeId(id).subscribe(
    //     (result)=>{
    //       this.savedRecipeList.push(result);
    //       this.selectedSavedRecipe=result;
    //     }
    //    )
    // }

    // displayDetails(recipeId:number){
    //  this.savedRecipeService.PostSavedRecipeByRecipeId(recipeId).subscribe(
    //   (result)=>{
    //     this.savedRecipeList.push(result);
    //     this.selectedSavedRecipe=result;
    //     this.savedRecipeService.getAllSavedRecipe().subscribe(
    //       (result:SavedRecipe[])=>{
    //         this.savedRecipeList=result;
    //       }
    //      )

    //   }
    //  )
    //  this.showRecipeDetails=true;
    // }




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
      console.log(this.comparedRecipeIds);
      
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

      

    // addToFavorites(recipeId:number){
    //   // checkIfExistInSavedRecipe(recipeId:number){
       
    //     this.spoonacualarService.CheckExistInSavedRecipe(recipeId).subscribe(
    //       (result:boolean)=>{
    //        this.checkExist=result;
    //        this.spoonacualarService.GetSavedRecipeIdByRecipeId(recipeId).subscribe(
    //         (result:number)=>{this.savedRecipeId=result}
    //       );
    //       if(this.checkExist==true){
    //         let newFavorite:Favorite ={id:0,accountId:this.accountService.currentAccount.id,recipeId:this.savedRecipeId,account:null};//this recipeId is savedRecipeId;
    //         console.log(this.accountService.currentAccount.id);
    //         console.log(this.savedRecipeId);
      
    //         console.log(newFavorite);
    //         console.log("test");
    //         this.favoriteService.addFavorite(newFavorite).subscribe(
    //         (result:Favorite)=>{
    //           console.log("test");
    //           this.accountFavorites.push(newFavorite);
    //           console.log(result);
    //         }
    //        )
    //       }
    //       else{
    //       this.spoonacualarService.FillSavedRecipeDb(recipeId).subscribe(
            
    //         ()=>{
    //           console.log("test");
    //         }
    //       )       
    //       this.addToFavorites(recipeId);
    //       }
    //       }
    //     );
      
    // }
  
    addToFavorites(recipeId:number, accountId:number, index:number){
      this.favoriteService.addALLToFavorites(recipeId, accountId).subscribe(
        (result) => {
          console.log(result);
          this.accountFavorites.push(result);
          this.isFavorited[index] = true;
        }
      )
    }

    // hideRecipeDetails(){
    //   this.showDetails=false;
    // }

    backRecipe(){
      this.showRecipeDetails=false;
    }


}
