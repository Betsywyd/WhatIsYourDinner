// To parse this data:
//
//   import { Convert } from "./file";
//
//   const savedRecipe = Convert.toSavedRecipe(json);

export interface SavedRecipe {
    id:                   number;
    recipeId:             number;
    title:                string;
    ingredients:          string;
    ingredientAmount:     string;
    image:                string;
    readyInMinutes:       number;
    servings:             number;
    analizedInstructions: string;
    favorites:            any[];
}

// Converts JSON strings to/from your types
export class Convert {
    public static toSavedRecipe(json: string): SavedRecipe {
        return JSON.parse(json);
    }

    public static savedRecipeToJson(value: SavedRecipe): string {
        return JSON.stringify(value);
    }
}
