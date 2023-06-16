using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WhatIsForDinnerBackEnd.Models;

namespace WhatIsForDinnerBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpoonacularController : ControllerBase
    {
        spoonacularDAL spoonacularDAL = new spoonacularDAL();
        
        [HttpGet("Recipe/{id}")]
        public Recipe GetRecipeById(int id)
        {
            return spoonacularDAL.GetRecipe(id);
        }


        [HttpGet("Search/{input}")]
        public RecipeSearchResult GetRecipe(string input) 
        {
            return spoonacularDAL.GetRecipeResult(input);

        }


        [HttpGet("Getingredients/{recipeId}")]
        public Extendedingredient[] GetExtendedingredients(int recipeId)
        {
            Recipe r=spoonacularDAL.GetRecipe(recipeId); 
            return r.extendedIngredients;
        }


        [HttpGet("GetAnalizedInstructions/{recipeId}")]
        public AnalizedInstructions[] GetAnalizedInstructions(int recipeId)
        {
            Recipe r = spoonacularDAL.GetRecipe(recipeId);
            return r.analyzedInstructions;
        }

        //[HttpGet("GetInstructions/{recipeId}")]
        //public Step[] GetInstructions(int recipeId)
        //{
        //    Recipe r = spoonacularDAL.GetRecipe(recipeId);
        //    List<AnalizedInstructions> analizedInstructions = r.analyzedInstructions.ToList();
        //    List<Step> steps = new List<Step>();
        //    for(int i = 0; i < analizedInstructions.Count; i++)
        //    {
        //        steps.Add(analizedInstructions[i].steps);
        //    }

        //}




        [HttpGet("Ingredient/{id}")]
        public Ingredient GetIngredientById(int id)
        {
            return spoonacularDAL.GetIngredient(id);
        }

    }







}
