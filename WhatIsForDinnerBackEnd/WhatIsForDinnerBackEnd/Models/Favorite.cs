using System;
using System.Collections.Generic;

namespace WhatIsForDinnerBackEnd.Models;

public partial class Favorite
{
    public int Id { get; set; }

    public int? AccountId { get; set; }

    public int RecipeId { get; set; }

    public virtual Account? Account { get; set; }

    public virtual SavedRecipe? Recipe { get; set; }
}
