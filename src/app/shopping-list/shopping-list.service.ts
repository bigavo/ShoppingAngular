import { Subject } from 'rxjs'
import { Ingredient } from './../shared/ingredient.model';

export class ShoppingListService{
    ingredientChanges = new Subject <Ingredient[]>();
    startedEditting = new Subject<number>();
    ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes',10)
      ];

      getIngredients(){
          return this.ingredients.slice();
      }
      getIngredient(index){
          return this.ingredients[index];
      }

      addIngredient(ingredient:Ingredient){
          this.ingredients.push(ingredient);
          this.ingredientChanges.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]){
          ingredients.forEach(ingredient => {
            this.addIngredient(ingredient);  
          });
          this.ingredientChanges.next(this.ingredients.slice());
      }

      updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientChanges.next(this.ingredients.slice());
      }

      deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientChanges.next(this.ingredients.slice());
      }
}