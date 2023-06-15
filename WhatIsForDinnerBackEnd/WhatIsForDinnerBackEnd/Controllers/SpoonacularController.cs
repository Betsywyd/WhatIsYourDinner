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

        [HttpGet]
        public RecipeSearchResult GetRecipe() 
        {
            return spoonacularDAL.GetRecipeResult();

        }



    }







}
