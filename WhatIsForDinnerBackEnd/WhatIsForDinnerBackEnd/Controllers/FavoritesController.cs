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
    public class FavoritesController : ControllerBase
    {
        private readonly WhatIsForDinnerDbContext _context;

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
            List<Favorite> accountFav = favoritesList.Where(f=>f.AccountId == accountId).ToList();
            List<int> recipeId= accountFav.Select(f => f.RecipeId!).ToList();
            List<SavedRecipe> favoritesRecipe= _context.SavedRecipes.Where(r=>recipeId.Contains(r.RecipeId!)).ToList();

            
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
          favorite.Id =null;

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

        private bool FavoriteExists(int id)
        {
            return (_context.Favorites?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
