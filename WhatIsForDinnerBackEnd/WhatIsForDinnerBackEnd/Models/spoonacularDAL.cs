using RestSharp;

namespace WhatIsForDinnerBackEnd.Models
{
    public class spoonacularDAL
    {
        public Recipe GetRecipe(int id)
        {
            
            RestClient rc = new RestClient($"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/{id}/information?includeNutrition=false");
            RestRequest rr = new RestRequest();
            rr.AddHeader("X-RapidAPI-Key", Secret.ApiKey);
            rr.AddHeader("X-RapidAPI-Host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com");


            Task<Recipe> recipe = rc.GetAsync<Recipe>(rr);
            Recipe r = recipe.Result;

            return r;   
        }


        public RecipeSearchResult GetRecipeResult(string input)
        {

            RestClient client = new RestClient($"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query={input}");
            RestRequest request = new RestRequest();
            request.AddHeader("X-RapidAPI-Key", Secret.ApiKey);
            request.AddHeader("X-RapidAPI-Host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com");
            Task<RecipeSearchResult> response = client.GetAsync<RecipeSearchResult>(request);
  
            return response.Result;
        }

        //public Ingredient GetIngredient(int id)
        //{

        //    RestClient rc = new RestClient($"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/ingredients/{id}/information?amount=1");
        //    RestRequest rr = new RestRequest();
        //    rr.AddHeader("X-RapidAPI-Key", Secret.ApiKey);
        //    rr.AddHeader("X-RapidAPI-Host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com");
        //    Task<Ingredient> ingredient = rc.GetAsync<Ingredient>(rr);
        //    Ingredient i = ingredient.Result;

        //    return i;
        //}

    }
}
