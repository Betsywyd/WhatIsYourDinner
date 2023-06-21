import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../favorites.service';
import { Favorite } from '../favorite';
import { AccountService } from '../account.service';
import { SavedRecipe } from '../saved-recipe';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit{

 favoritesSavedRecipes:SavedRecipe[]=[];
 currentAccountFav:number[]=[];


  constructor(private favoriteService:FavoritesService,private accountService:AccountService){};
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







}
