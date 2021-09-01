import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[alertHost]',
  })
export class PlaceholderDirective {
    constructor(public viewContainerRef: ViewContainerRef){}

}