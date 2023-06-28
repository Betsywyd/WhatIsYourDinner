using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using WhatIsForDinnerBackEnd.Models;

namespace WhatIsForDinnerBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        private readonly WhatIsForDinnerDbContext _context;
        private readonly spoonacularDAL spoonacularDAL = new spoonacularDAL();
        public FavoritesController(WhatIsForDinnerDbContext context)
        {
            _context = context;
        }

        // GET: api/Favorites
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Favorite>>> GetFavorites()
        {
            if (_context.Favorites == null)
            {
                return NotFound();
            }
            return await _context.Favorites.ToListAsync();
        }


        //Get Favorites by account's id(added by hand)

        //[HttpGet("Account/{accountId}")]
        //public async Task<ActionResult<IEnumerable<Favorite>>> GetAccountFav(int accountId)
        //{
        //    if (_context.Favorites == null)
        //    {
        //        return NotFound();
        //    }


        //    return await _context.Accounts.Find(accountId).Favorites.ToListAsync();
        //}


        //Get Favorites by account's id(added by hand)

        [HttpGet("AccountFav/{accountId}")]
        public List<SavedRecipe> GetAccountFav(int accountId)
        {
            List<Favorite> favoritesList = _context.Favorites.ToList();
            List<Favorite> accountFav = favoritesList.Where(f => f.AccountId == accountId).ToList();
            List<int> savedRecipeIds = accountFav.Select(f => f.RecipeId).ToList();
            List<SavedRecipe> favoritesRecipe = new List<SavedRecipe>();
            for (int i = 0; i < savedRecipeIds.Count; i++)
            {
                SavedRecipe savedRecipe = _context.SavedRecipes.Where(s => s.Id == savedRecipeIds[i]).FirstOrDefault();
                favoritesRecipe.Add(savedRecipe);
            }
            //List<SavedRecipe> favoritesRecipe = _context.SavedRecipes.Where(s => savedRecipeIds.Contains(s.RecipeId)).ToList();
            return favoritesRecipe;
        }






        // GET: api/Favorites/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Favorite>> GetFavorite(int id)
        {
            if (_context.Favorites == null)
            {
                return NotFound();
            }
            var favorite = await _context.Favorites.FindAsync(id);

            if (favorite == null)
            {
                return NotFound();
            }

            return favorite;
        }

        // PUT: api/Favorites/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFavorite(int id, Favorite favorite)
        {
            if (id != favorite.Id)
            {
                return BadRequest();
            }

            _context.Entry(favorite).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FavoriteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Favorites
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Favorite>> PostFavorite(Favorite favorite)
        {
            if (_context.Favorites == null)
            {
                return Problem("Entity set 'WhatIsForDinnerDbContext.Favorites'  is null.");
            }
            //favorite.Id =null;

            _context.Favorites.Add(favorite);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFavorite", new { id = favorite.Id }, favorite);
        }

        // DELETE: api/Favorites/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFavorite(int id)
        {
            if (_context.Favorites == null)
            {
                return NotFound();
            }
            var favorite = await _context.Favorites.FindAsync(id);
            if (favorite == null)
            {
                return NotFound();
            }

            _context.Favorites.Remove(favorite);
            await _context.SaveChangesAsync();

            return NoContent();
        }



        [HttpDelete("SavedRecipe/{savedRecipeId}")]
        public async Task<IActionResult> DeleteFavoriteBySavedRecipeId(int savedRecipeId)
        {
            if (_context.Favorites == null)
            {
                return NotFound();
            }

            int favoriteId = _context.Favorites.Where(f => f.RecipeId == savedRecipeId).FirstOrDefault().Id;
            var favorite = await _context.Favorites.FindAsync(favoriteId);
            if (favorite == null)
            {
                return NotFound();
            }

            _context.Favorites.Remove(favorite);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FavoriteExists(int id)
        {
            return (_context.Favorites?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpPost("CreateFavorite/{recipeId}")]
        public async Task<ActionResult<Favorite>> PostAllToFavorite(int recipeId, int accountId)
        {
            List<int> savedRecipeIds = _context.SavedRecipes.Where(e => e.RecipeId == recipeId).Select(e => e.Id).ToList();
            List<int> userFavs = _context.Favorites.Where(id => id.AccountId == accountId).Select(id => id.RecipeId).ToList();
            //Recipe exsistis in backend, no neep to call API
            if (savedRecipeIds.Count() > 0)
            {
                //recipe already saved& faved
                if (savedRecipeIds.Any(sr => userFavs.Contains(sr)))
                {

                    return new Favorite();
                }
                else
                {
                    Favorite favorite = new Favorite() { RecipeId = savedRecipeIds[0], AccountId = accountId };
                    _context.Favorites.Add(favorite);
                    await _context.SaveChangesAsync();

                    return CreatedAtAction("GetFavorite", new { id = favorite.Id }, favorite);
                }
            }
            //Favorite doesnt exist nor does saved recipe
            else
            {
                Recipe recipe = spoonacularDAL.GetRecipe(recipeId);
                SavedRecipe sr = new SavedRecipe();
                sr.RecipeId = recipeId;
                sr.Title = recipe.title;
                List<string> IngredientNames = recipe.extendedIngredients.Select(n => n.name).ToList();
                List<float> IngredientAmounts = recipe.extendedIngredients.Select(n => n.amount).ToList();
                List<string> IngredientUnits = recipe.extendedIngredients.Select(n => n.unit).ToList();
                string ingredients = "";
                for (int i = 0; i < IngredientNames.Count; i++)
                {
                    ingredients += IngredientNames[i] + ": " + " " + IngredientAmounts[i] + " " + IngredientUnits[i] + "\n";
                }
                sr.Ingredients = ingredients;
                sr.Image = recipe.image;
                sr.ReadyInMinutes = recipe.readyInMinutes;
                sr.Servings = recipe.servings;

                //Check instructions format
                if (recipe.analyzedInstructions.Length > 0)
                {
                    List<string> steps = recipe.analyzedInstructions[0].steps.Select(s => s.step).ToList();
                    for (int i = 0; i < steps.Count; i++)
                    {
                        sr.AnalizedInstructions += steps[i] + "@";
                    }
                    //sr.AnalizedInstructions = string.Join(",", steps);
                }
                else
                {
                    sr.AnalizedInstructions = recipe.instructions;
                }

                _context.SavedRecipes.Add(sr);
                await _context.SaveChangesAsync();

                sr = _context.SavedRecipes.FirstOrDefault(saved => saved.RecipeId == recipeId);
                Favorite favorite = new Favorite() { RecipeId = sr.Id, AccountId = accountId };
                _context.Favorites.Add(favorite);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetFavorite", new { id = favorite.Id }, favorite);
            }

            //favorite.Id =null;
        }

        [HttpPost("CreateFavoriteBySavedRecipeId/{savedRecipeId}")]

        public async Task<ActionResult<Favorite>> PostFavoriteBySavedRecipeId(int savedRecipeId, int accountId)
        {

            Favorite favorite = new Favorite() { RecipeId = savedRecipeId, AccountId = accountId };
            _context.Favorites.Add(favorite);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFavorite", new { id = favorite.Id }, favorite);
        }

        [HttpGet("ResultsAreFavorited/{accountId}/{resultQuery}")]
        public Result[] CheckIfResultIsFavorited(string resultQuery, int accountId)
        {
            Result[] result = spoonacularDAL.GetRecipeResult(resultQuery).results;
            List<SavedRecipe> favorites = GetAccountFav(accountId);
            for(int i = 0; i < result.Length; i++)
            {
                List<SavedRecipe> list = favorites.Where(fav => fav.RecipeId == result[i].id).ToList();
                if (list.Count > 0) 
                {
                    result[i].isFavorited = true;
                } 
            }
            return result;
        }






    }
    }

