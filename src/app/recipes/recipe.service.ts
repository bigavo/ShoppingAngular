import { Subject } from 'rxjs';
import { Ingredient } from './../shared/ingredient.model';
import {  Injectable } from '@angular/core'; 
import { Recipe } from './recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipesChanged  = new Subject<Recipe[]>();
    ingredientsToShoppingList = new Subject<Ingredient[]>();
    private recipes: Recipe[] = [
        new Recipe('A 1st recipe',
        'This is 1st a recipe test',
        'https://cdn.tgdd.vn/2020/07/CookProduct/Untitled-2-1200x676-3.jpg',
        [
            new Ingredient("Bun", 2),
            new Ingredient("Salad", 1),
            new Ingredient("Meat ", 2),
            new Ingredient("Cheese", 1),
            new Ingredient("Tomato", 1),
        ]),
        new Recipe('A 2nd recipe',
        'This is 2nd a recipe test',
        'https://cdn.asiastreetfood.com/uploads/Banh-Cuon-crepes-vietnam-rezept2.jpg?strip=all&lossy=1&quality=80&ssl=1', 
        [
            new Ingredient("Bun", 2),
            new Ingredient("Salad", 1),
            new Ingredient("Meat ", 2),
            new Ingredient("Cheese", 1),
            new Ingredient("Tomato", 1),
        ]),
        
        new Recipe('A 3rd recipe',
        'This is 3rd a recipe test',
        'https://i1.wp.com/www.angsarap.net/wp-content/uploads/2018/05/Pho-Bo-with-Oxtail-and-Tendons-Wide.jpg?fit=1080%2C720&ssl=1',
        [
            new Ingredient("Bun", 2),
            new Ingredient("Salad", 1),
            new Ingredient("Meat ", 2),
            new Ingredient("Cheese", 1),
            new Ingredient("Tomato", 1),
        ]
        ),
       
      ];
      
      constructor(private sLService:ShoppingListService){}

      getRecipes(){
          return this.recipes.slice();
      }
      getRecipe(index:number){
          return this.recipes[index];
      }

      addIngredienttoShoppingList(ingredients:Ingredient[]){
          this.sLService.addIngredients(ingredients);
      }
      addRecipe(recipe : Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }
      updateRecipe(index:number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }
      deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }
}