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




        [HttpGet("Ingredient/{id}")]
        public Ingredient GetIngredientById(int id)
        {
            return spoonacularDAL.GetIngredient(id);
        }

    }







}
