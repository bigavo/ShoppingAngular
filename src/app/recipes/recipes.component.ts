import { AuthService } from './../auth/auth.service';

import { Recipe } from './recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  isAuthenticated = false;
  selectedRecipe:Recipe;
  constructor(private authService: AuthService) { }
  
  ngOnInit(){
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  } 
   
}
