import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, EventEmitter, Output, OnDestroy, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") slForm: NgForm
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private sLService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.sLService.startedEditting
      .subscribe(
          (index:number) => {
            this.editedItemIndex = index;
            this.editMode = true;
            this.editedItem = this.sLService.getIngredient(index);
            this.slForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            })
          }
      );
  }

  onSubmitItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount); 
    if (this.editMode){
      this.sLService.updateIngredient(this.editedItemIndex,newIngredient);
    } else {
      this.sLService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onDelete(){
    this.sLService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  
}
