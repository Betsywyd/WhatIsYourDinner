import { Component, Input, OnInit } from '@angular/core';
import { SavedRecipe } from '../saved-recipe';
import { SavedRecipeService } from '../saved-recipe.service';

@Component({
  selector: 'app-saved-recipe-details',
  templateUrl: './saved-recipe-details.component.html',
  styleUrls: ['./saved-recipe-details.component.css']
})
export class SavedRecipeDetailsComponent implements OnInit{

  constructor(private savedRecipeService:SavedRecipeService ){}
  ngOnInit(): void {
    this.savedRecipeService.getSavedRecipeById(this.displayRecipe.id).subscribe(
      (result:SavedRecipe)=>{
        this.displayRecipe=result;
  
      }
     )
  }
 



  @Input()  displayRecipe:SavedRecipe={} as SavedRecipe;
}
