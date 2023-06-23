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
        WhatIsForDinnerDbContext db = new WhatIsForDinnerDbContext();
        
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

        [HttpGet("GetSteps/{recipeId}")]
        public Step[] GetSteps(int recipeId)
        {
            Recipe r = spoonacularDAL.GetRecipe(recipeId);
            List<AnalizedInstructions> analizedInstructions = r.analyzedInstructions.ToList();
            List<Step> stepsList = new List<Step>();
            for (int i = 0; i < analizedInstructions.Count; i++)
            {
                for (int j = 0; j < analizedInstructions[i].steps.Length; j++)
                {
                    stepsList.Add(analizedInstructions[i].steps[j]);
                }

            }
            return stepsList.ToArray();
        }




        [HttpGet("Ingredient/{id}")]
        public Ingredient GetIngredientById(int id)
        {
            return spoonacularDAL.GetIngredient(id);
        }


        [HttpGet("Fill")]
        public void FillInDb()
        {
            List<int> recipeIdList = new List<int>();
            List<string> ingredientName = new List<string>()
            {
                "beef",
                "carrot",
                "pork",
                "tomato",
                "crab"
            };

            for (int i = 0; i < ingredientName.Count; i++)
            {

                RecipeSearchResult rr = spoonacularDAL.GetRecipeResult(ingredientName[i]);
                for (int j = 0; j < rr.results.Length; j++)
                {
                    recipeIdList.Add(rr.results[j].id);
                }
            }
            for (int i = 0; i < recipeIdList.Count; i++)
            {
                Recipe r = spoonacularDAL.GetRecipe(recipeIdList[i]);
                //Extendedingredient[] e = r.extendedIngredients;
              
                SavedRecipe savedRecipe = new SavedRecipe() { Id = 0, RecipeId = r.id, Title = r.title, Ingredients = r.extendedIngredients.ToString(), Image = r.image, ReadyInMinutes = r.readyInMinutes, Servings = r.servings,AnalizedInstructions=r.analyzedInstructions.ToString(),Favorites=null};



                db.SavedRecipes.Add(savedRecipe);
            }

            db.SaveChanges();
        }

        [HttpGet("FillByRecipeId/{recipeId}")]
        public void FillSavedRecipeDb(int recipeId)
        {
            Recipe r = spoonacularDAL.GetRecipe(recipeId);
            SavedRecipe savedRecipe = new SavedRecipe() { Id = 0, RecipeId = r.id, Title = r.title, Ingredients = r.extendedIngredients.ToString(), Image = r.image, ReadyInMinutes = r.readyInMinutes, Servings = r.servings, AnalizedInstructions = r.analyzedInstructions.ToString(), Favorites = null };
            db.SavedRecipes.Add(savedRecipe);

        }



        [HttpGet("CheckExistInSavedRecipe/{recipeId}")]
        public bool CheckRecipeExitInSavedRecipe(int recipeId)
        {
            SavedRecipe savedRecipe = db.SavedRecipes.Where(s => s.RecipeId == recipeId).FirstOrDefault();
            if (savedRecipe != null)
            {
                return true;
            }
            else { return false; }
        }

        [HttpGet("SavedRecipeId/{recipeId}")]
        public int GetSavedRecipeIdByRecipeId(int recipeId)
        {
            SavedRecipe savedRecipe = db.SavedRecipes.Where(s => s.RecipeId == recipeId).FirstOrDefault();
            if (savedRecipe != null)
            {
                int savedRecipeId = savedRecipe.Id;
                return savedRecipeId;
            }
           
           else return -1;
            
        }

    }
}
