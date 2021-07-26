import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[]= [
    new Recipe('A test recipe', 'This is simply a recipe test', 'https://images.squarespace-cdn.com/content/v1/5bef3b2cb40b9d5236438432/1568758022121-IXK1R5J71KADVK26GTHQ/beefsteak-featured-L-2.jpg?format=1000w'),
    new Recipe('A test recipe', 'This is simply a recipe test', 'https://images.squarespace-cdn.com/content/v1/5bef3b2cb40b9d5236438432/1568758022121-IXK1R5J71KADVK26GTHQ/beefsteak-featured-L-2.jpg?format=1000w'),
    new Recipe('A test recipe', 'This is simply a recipe test', 'https://images.squarespace-cdn.com/content/v1/5bef3b2cb40b9d5236438432/1568758022121-IXK1R5J71KADVK26GTHQ/beefsteak-featured-L-2.jpg?format=1000w')
    
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
