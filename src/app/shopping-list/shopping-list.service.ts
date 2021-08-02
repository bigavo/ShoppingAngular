import { EventEmitter } from '@angular/core';
import { Ingredient } from './../shared/ingredient.model';

export class ShoppingListService{
    addedIngredients = new EventEmitter<Ingredient>();
    ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes',10)
      ];

      getIngredients(){
          return this.ingredients.slice();
      }
}