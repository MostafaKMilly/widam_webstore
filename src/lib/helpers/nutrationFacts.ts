// src/lib/nutritionFacts.ts

export interface NutritionFacts {
  kcal: number;
  protein: number; // in grams
  carbohydrates: number; // in grams
  sugar: number; // in grams
  fat: number; // in grams
}

export const nutritionFactsMapping: { [key: string]: NutritionFacts } = {
  Piece: {
    kcal: 750,
    protein: 36,
    carbohydrates: 0,
    sugar: 0,
    fat: 0,
  },
  Kg: {
    kcal: 7500,
    protein: 360,
    carbohydrates: 0,
    sugar: 0,
    fat: 0,
  },
  // Add more mappings as needed
};
