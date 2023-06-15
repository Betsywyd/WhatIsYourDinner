// To parse this data:
//
//   import { Convert, Ingredient } from "./file";
//
//   const ingredient = Convert.toIngredient(json);

export interface Ingredient {
    id:                number;
    original:          string;
    originalName:      string;
    name:              string;
    amount:            number;
    unit:              string;
    unitShort:         string;
    unitLong:          string;
    possibleUnits:     string[];
    estimatedCost:     EstimatedCost;
    consistency:       string;
    shoppingListUnits: string[];
    aisle:             string;
    image:             string;
    meta:              any[];
    nutrition:         Nutrition;
    categoryPath:      string[];
}

export interface EstimatedCost {
    value: number;
    unit:  string;
}

export interface Nutrition {
    nutrients:        Flavonoid[];
    properties:       Flavonoid[];
    flavonoids:       Flavonoid[];
    caloricBreakdown: CaloricBreakdown;
    weightPerServing: WeightPerServing;
}

export interface CaloricBreakdown {
    percentProtein: number;
    percentFat:     number;
    percentCarbs:   number;
}

export interface Flavonoid {
    name:                 string;
    amount:               number;
    unit:                 Unit;
    percentOfDailyNeeds?: number;
}

export enum Unit {
    Empty = "",
    G = "g",
    Iu = "IU",
    Kcal = "kcal",
    Mg = "mg",
    Unit = "%",
    Μg = "µg",
}

export interface WeightPerServing {
    amount: number;
    unit:   Unit;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toIngredient(json: string): Ingredient {
        return JSON.parse(json);
    }

    public static ingredientToJson(value: Ingredient): string {
        return JSON.stringify(value);
    }
}
