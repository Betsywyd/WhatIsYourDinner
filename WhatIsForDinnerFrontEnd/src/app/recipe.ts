

export enum Consistency {
    Liquid = "LIQUID",
    Solid = "SOLID",
}

export interface Measures {
    us:     Metric;
    metric: Metric;
}

export interface Metric {
    amount:    number;
    unitShort: string;
    unitLong:  string;
}

export interface WinePairing {
    pairedWines:    any[];
    pairingText:    string;
    productMatches: any[];
}

// Converts JSON strings to/from your types
export class Convert {
    public static toRecipe(json: string): Recipe {
        return JSON.parse(json);
    }

    public static recipeToJson(value: Recipe): string {
        return JSON.stringify(value);
    }
}

// To parse this data:
//
//   import { Convert, RecipeSearchResult } from "./file";
//
//   const recipeSearchResult = Convert.toRecipeSearchResult(json);

export interface RecipeSearchResult {
    results:      Result[];
    offset:       number;
    number:       number;
    totalResults: number;
}

export interface Result {
    id:        number;
    title:     string;
    image:     string;
    imageType: ImageType;
    nutrition: null;
    isFavorited:boolean;
}

export enum ImageType {
    Jpg = "jpg",
}


// To parse this data:
//
//   import { Convert } from "./file";
//
//   const empty = Convert.toEmpty(json);

export interface Recipe {
    vegetarian:               boolean;
    vegan:                    boolean;
    glutenFree:               boolean;
    dairyFree:                boolean;
    veryHealthy:              boolean;
    cheap:                    boolean;
    veryPopular:              boolean;
    sustainable:              boolean;
    lowFodmap:                boolean;
    weightWatcherSmartPoints: number;
    gaps:                     string;
    preparationMinutes:       number;
    cookingMinutes:           number;
    aggregateLikes:           number;
    healthScore:              number;
    creditsText:              string;
    sourceName:               string;
    pricePerServing:          number;
    extendedIngredients:      ExtendedIngredient[];
    id:                       number;
    title:                    string;
    readyInMinutes:           number;
    servings:                 number;
    sourceUrl:                string;
    image:                    string;
    imageType:                string;
    summary:                  string;
    cuisines:                 string[];
    dishTypes:                string[];
    diets:                    any[];
    occasions:                any[];
    winePairing:              WinePairing;
    instructions:             string;
    analyzedInstructions:     AnalyzedInstructions[];
    report:                   null;
    tips:                     Tips;
    openLicense:              number;
    suspiciousDataScore:      number;
    approved:                 number;
    unknownIngredients:       any[];
    userTags:                 any[];
    originalId:               null;
    spoonacularSourceUrl:     string;
    license?:                 string;
}

export interface AnalyzedInstructions {
    name:  string;
    steps: Step[];
}

export interface Step {
    number:      number;
    step:        string;
    ingredients: Ent[];
    equipment:   Ent[];
    length:      Length;
}

export interface Ent {
    id:            number;
    name:          string;
    localizedName: string;
    image:         string;
}

export interface Length {
    number: number;
    unit:   string;
}

export interface ExtendedIngredient {
    id:           number;
    aisle:        string;
    image:        string;
    consistency:  Consistency;
    name:         string;
    nameClean:    string;
    original:     string;
    originalName: string;
    amount:       number;
    unit:         string;
    meta:         string[];
    measures:     Measures;
    price:number;
    priceUnit:string;
}



export interface Measures {
    us:     Metric;
    metric: Metric;
}

export interface Metric {
    amount:    number;
    unitShort: string;
    unitLong:  string;
}

export interface Tips {
    health:  string[];
    price:   string[];
    cooking: string[];
    green:   string[];
}



