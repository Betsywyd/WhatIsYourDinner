import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateAccountComponent } from './create-account/create-account.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { SavedRecipeComponent } from './saved-recipe/saved-recipe.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { CompareRecipesComponent } from './compare-recipes/compare-recipes.component';

const routes : Route[] = [
  {path:'createAccount', component:CreateAccountComponent},
  {path:'login', component:AccountComponent},
  {path:'favorites',component:FavoriteComponent},
  {path:'recipes',component:RecipeComponent},
  {path:'compare', component:CompareRecipesComponent}
 
];

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    FavoriteComponent,
    CreateAccountComponent,
    RecipeComponent,
    RecipeDetailsComponent,
    SavedRecipeComponent,
    EditPasswordComponent,
    CompareRecipesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
