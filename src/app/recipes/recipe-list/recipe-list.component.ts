import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  
})
export class RecipeListComponent implements OnInit {
    recipes: Recipe[];
  constructor(private RecipeService: RecipeService, 
              private router: Router,
              private route: ActivatedRoute) {}
  ngOnInit(){
    this.RecipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    this.recipes = this.RecipeService.getRecipes();
 }
  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
