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

        public RecipeSearchResult GetRecipeResult()
        {

            RestClient client = new RestClient($"https://api.spoonacular.com/recipes/complexSearch");
            RestRequest request = new RestRequest();
            request.AddQueryParameter("apiKey", Secret.ApiKey);
            Task<RecipeSearchResult> response = client.GetAsync<RecipeSearchResult>(request);
           

            return response.Result;
        }






    }
}
