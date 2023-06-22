using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WhatIsForDinnerBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    Password = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Accounts__3214EC07E37313EC", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SavedRecipe",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    recipeId = table.Column<int>(type: "int", nullable: false),
                    title = table.Column<string>(type: "varchar(1)", unicode: false, maxLength: 1, nullable: true),
                    ingredients = table.Column<string>(type: "varchar(1)", unicode: false, maxLength: 1, nullable: true),
                    ingredientAmount = table.Column<string>(type: "varchar(1)", unicode: false, maxLength: 1, nullable: true),
                    image = table.Column<string>(type: "varchar(1)", unicode: false, maxLength: 1, nullable: false),
                    readyInMinutes = table.Column<int>(type: "int", nullable: true),
                    servings = table.Column<int>(type: "int", nullable: true),
                    analizedInstructions = table.Column<string>(type: "varchar(1)", unicode: false, maxLength: 1, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__SavedRec__3213E83F3C6A1A49", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Favorites",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    accountId = table.Column<int>(type: "int", nullable: true),
                    recipeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Favorite__3213E83F7DBFF375", x => x.id);
                    table.ForeignKey(
                        name: "FK__Favorites__accou__68487DD7",
                        column: x => x.accountId,
                        principalTable: "Accounts",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__Favorites__recip__693CA210",
                        column: x => x.recipeId,
                        principalTable: "SavedRecipe",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Favorites_accountId",
                table: "Favorites",
                column: "accountId");

            migrationBuilder.CreateIndex(
                name: "IX_Favorites_recipeId",
                table: "Favorites",
                column: "recipeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Favorites");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "SavedRecipe");
        }
    }
}
