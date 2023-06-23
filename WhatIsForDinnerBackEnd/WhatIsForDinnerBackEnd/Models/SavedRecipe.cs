using System;
using System.Collections.Generic;

namespace WhatIsForDinnerBackEnd.Models;

public partial class SavedRecipe
{
    public int Id { get; set; }

    public int RecipeId { get; set; }

    public string? Title { get; set; }

    public string? Ingredients { get; set; }

    public string Image { get; set;}
    public int? ReadyInMinutes { get; set; }

    public int? Servings { get; set; }

    public string? AnalizedInstructions { get; set; }
  

    public virtual ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
}
