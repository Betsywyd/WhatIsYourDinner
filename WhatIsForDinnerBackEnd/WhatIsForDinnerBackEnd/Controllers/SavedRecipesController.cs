using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WhatIsForDinnerBackEnd.Models;

namespace WhatIsForDinnerBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SavedRecipesController : ControllerBase
    {
        private readonly WhatIsForDinnerDbContext _context;
        spoonacularDAL spoonacularDAL = new spoonacularDAL();

        public SavedRecipesController(WhatIsForDinnerDbContext context)
        {
            _context = context;
        }

        // GET: api/SavedRecipes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SavedRecipe>>> GetSavedRecipes()
        {
          if (_context.SavedRecipes == null)
          {
              return NotFound();
          }
            return await _context.SavedRecipes.ToListAsync();
        }

        // GET: api/SavedRecipes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SavedRecipe>> GetSavedRecipe(int id)
        {
          if (_context.SavedRecipes == null)
          {
              return NotFound();
          }
            var savedRecipe = await _context.SavedRecipes.FindAsync(id);

            if (savedRecipe == null)
            {
                return NotFound();
            }

            return savedRecipe;
        }

        // PUT: api/SavedRecipes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSavedRecipe(int id, SavedRecipe savedRecipe)
        {
            if (id != savedRecipe.Id)
            {
                return BadRequest();
            }

            _context.Entry(savedRecipe).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SavedRecipeExists(id))
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

        // POST: api/SavedRecipes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SavedRecipe>> PostSavedRecipe(SavedRecipe savedRecipe)
        {
          if (_context.SavedRecipes == null)
          {
              return Problem("Entity set 'WhatIsForDinnerDbContext.SavedRecipes'  is null.");
          }
            _context.SavedRecipes.Add(savedRecipe);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSavedRecipe", new { id = savedRecipe.Id }, savedRecipe);
        }

        [HttpPost("{recipeId}")]
        public async Task<ActionResult<SavedRecipe>> PostSavedRecipeByRecipeId(int recipeId)
        {

            if (_context.SavedRecipes == null)
            {
                return Problem("Entity set 'WhatIsForDinnerDbContext.SavedRecipes'  is null.");
            }

            Recipe recipe = spoonacularDAL.GetRecipe(recipeId);
            bool check= _context.SavedRecipes.Select(s=>s.RecipeId).Contains(recipeId);
            if (check == true)
            {
                return new SavedRecipe();
            }
            else { 
            SavedRecipe sr = new SavedRecipe();
            sr.RecipeId = recipeId;
            sr.Title = recipe.title;
            List<string> IngredientNames = recipe.extendedIngredients.Select(n => n.name).ToList();
            List<float> IngredientAmounts = recipe.extendedIngredients.Select(n => n.amount).ToList();
            List<string> IngredientUnits = recipe.extendedIngredients.Select(n => n.unit).ToList();
            string ingredients = "";
            for (int i = 0; i < IngredientNames.Count; i++)
            {
                //ingredients += IngredientNames[i] + "," + IngredientAmounts[i] + "," + IngredientUnits[i] + "\n";
                 ingredients += (i + 1) + "." + IngredientNames[i] + "," + IngredientAmounts[i] + "," + IngredientUnits[i] + "\n"+ ".  ";
                }
            sr.Ingredients = ingredients;
            sr.Image = recipe.image;
            sr.ReadyInMinutes = recipe.readyInMinutes;
            sr.Servings = recipe.servings;

            //Check instructions format
            if (recipe.analyzedInstructions.Length > 0)
            {
                List<string> steps = recipe.analyzedInstructions[0].steps.Select(s => s.step).ToList();
                    //sr.AnalizedInstructions = string.Join(",", steps);
                    for (int i = 0; i < steps.Count; i++)
                    {
                        sr.AnalizedInstructions += (i + 1) + "." + steps[i]+"  ";
                    }
                }
            else
            {
                sr.AnalizedInstructions = recipe.instructions;
            }

            _context.SavedRecipes.Add(sr);
            await _context.SaveChangesAsync();
             return CreatedAtAction("GetSavedRecipe", new { id = sr.Id }, sr);
            }

        }




        // DELETE: api/SavedRecipes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSavedRecipe(int id)
        {
            if (_context.SavedRecipes == null)
            {
                return NotFound();
            }
            var savedRecipe = await _context.SavedRecipes.FindAsync(id);
            if (savedRecipe == null)
            {
                return NotFound();
            }

            _context.SavedRecipes.Remove(savedRecipe);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SavedRecipeExists(int id)
        {
            return (_context.SavedRecipes?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpGet("SavedRecipe/{recipeId}")]
        public SavedRecipe GetSavedRecipeByRecipeId(int recipeId)
        {
            SavedRecipe savedRecipe = _context.SavedRecipes.Where(s => s.RecipeId == recipeId).First();
            if(savedRecipe==null)
            {
               return null; 
            }
            return savedRecipe;
        }
        [HttpGet("RecipeId/{savedRecipeId}")]
        public int GetRecipeIdBySavedRecipeId(int savedRecipeId)
        {
            SavedRecipe savedRecipe = _context.SavedRecipes.Where(s=>s.Id == savedRecipeId).FirstOrDefault();
            int id = savedRecipe.RecipeId;
            return id;
        }

    }
}
