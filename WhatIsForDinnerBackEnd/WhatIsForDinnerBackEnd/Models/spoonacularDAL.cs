using RestSharp;

namespace WhatIsForDinnerBackEnd.Models
{
    public class spoonacularDAL
    {
        public Recipe GetRecipe(int id)
        {
            
            RestClient rc = new RestClient($"https://api.spoonacular.com/recipes/{id}/information?includeNutrition=false");
            RestRequest rr = new RestRequest();
            rr.AddQueryParameter("apiKey", Secret.ApiKey);
            Task<Recipe> recipe = rc.GetAsync<Recipe>(rr);
            Recipe r = recipe.Result;

            return r;   
        }

        public Ingredient GetIngredient(int id)
        {

            RestClient rc = new RestClient($"https://api.spoonacular.com/food/ingredients/{id}/information?amount=1");
            RestRequest rr = new RestRequest();
            rr.AddQueryParameter("apiKey", Secret.ApiKey);
            Task<Ingredient> ingredient = rc.GetAsync<Ingredient>(rr);
            Ingredient i = ingredient.Result;

            return i;
        }
    }
}
