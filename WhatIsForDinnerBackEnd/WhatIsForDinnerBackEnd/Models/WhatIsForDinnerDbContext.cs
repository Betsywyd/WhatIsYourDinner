using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WhatIsForDinnerBackEnd.Models;

public partial class WhatIsForDinnerDbContext : DbContext
{
    public WhatIsForDinnerDbContext()
    {
    }

    public WhatIsForDinnerDbContext(DbContextOptions<WhatIsForDinnerDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<Favorite> Favorites { get; set; }

    public virtual DbSet<SavedRecipe> SavedRecipes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer($"Server=tcp:what-is-for-dinner.database.windows.net,1433;Initial Catalog=WhatIsForDinnerDb;Persist Security Info=False;User ID={Secret.UserName};Password={Secret.Password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Accounts__3214EC07E37313EC");

            entity.Property(e => e.Email).HasMaxLength(30);
            entity.Property(e => e.Name).HasMaxLength(20);
            entity.Property(e => e.Password).HasMaxLength(30);
        });

        modelBuilder.Entity<Favorite>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Favorite__3213E83F7DBFF375");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AccountId).HasColumnName("accountId");
            entity.Property(e => e.RecipeId).HasColumnName("recipeId");

            entity.HasOne(d => d.Account).WithMany(p => p.Favorites)
                .HasForeignKey(d => d.AccountId)
                .HasConstraintName("FK__Favorites__accou__68487DD7");

            entity.HasOne(d => d.Recipe).WithMany(p => p.Favorites)
                .HasForeignKey(d => d.RecipeId)
                .HasConstraintName("FK__Favorites__recip__693CA210");
        });

        modelBuilder.Entity<SavedRecipe>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__SavedRec__3213E83F3C6A1A49");

            entity.ToTable("SavedRecipe");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AnalizedInstructions)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("analizedInstructions");
            entity.Property(e => e.Image)
                //.HasColumnType("image")
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("image");
            //entity.Property(e => e.IngredientAmount)
            //    .HasMaxLength(1)
            //    .IsUnicode(false)
            //    .HasColumnName("ingredientAmount");
            entity.Property(e => e.Ingredients)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("ingredients");
            entity.Property(e => e.ReadyInMinutes).HasColumnName("readyInMinutes");
            entity.Property(e => e.RecipeId).HasColumnName("recipeId");
            entity.Property(e => e.Servings).HasColumnName("servings");
            entity.Property(e => e.Title)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("title");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
