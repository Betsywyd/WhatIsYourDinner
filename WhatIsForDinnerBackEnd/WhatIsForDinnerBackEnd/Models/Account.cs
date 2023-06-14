using System;
using System.Collections.Generic;

namespace WhatIsForDinnerBackEnd.Models;

public partial class Account
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public virtual ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
}
