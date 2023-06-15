// To parse this data:
//
//   import { Convert } from "./file";
//
//   const favorite = Convert.toFavorite(json);

export interface Favorite {
    id:        number;
    accountId: number;
    recipeId:  number;
    account:   null;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toFavorite(json: string): Favorite {
        return JSON.parse(json);
    }

    public static favoriteToJson(value: Favorite): string {
        return JSON.stringify(value);
    }
}
