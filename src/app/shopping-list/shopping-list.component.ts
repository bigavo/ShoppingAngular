import { Ingredient } from './../shared/ingredient.model';
import { Recipe } from './../recipes/recipe.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { RecipeService } from '../recipes/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
 ingredients: Ingredient[];

 private igChangedSub: Subscription;
  
  constructor(private sLService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.sLService.getIngredients();
    this.igChangedSub=this.sLService.ingredientChanges
      .subscribe(
        (ingredients: Ingredient[]) => {
            this.ingredients = ingredients;
            }); 
  }
  onEditItem(index: number){
    this.sLService.startedEditting.next(index);
  }

  OnDestroy(){
    this.igChangedSub.unsubscribe();
  }

}
