import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { Router } from '@angular/router';
import { AuthService, AuthResponseData} from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, ViewChild } from "@angular/core";
import { timeout } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { OnDestroy } from '@angular/core';
@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
    constructor(private authService:AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver){}
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    private closeSub: Subscription;
    
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;


    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }
    
    onSubmit(form: NgForm){
        if (!form.valid) {
            return;
          }
          const email = form.value.email;
          const password = form.value.password;
          let authObs: Observable<AuthResponseData>;

          this.isLoading = true;
          if (this.isLoginMode) {
           authObs = this.authService.login(email, password);
          } else {
           authObs = this.authService.signup(email, password);
          }
        
          authObs.subscribe(
            resData => {
              console.log(resData);
              this.isLoading = false;
              this.router.navigate(['/recipes']);
            },
            errorMessage => {
              console.log(errorMessage);
              this.error = errorMessage;
              this.showErrorAlert(errorMessage);
              this.isLoading = false;
            }
          );

          form.reset();
    }
    onHandleError(){
      this.error = null;
    }
    showErrorAlert(message: string){
      const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
        AlertComponent
      );
      const hostViewContainerRef = this.alertHost.viewContainerRef;
      hostViewContainerRef.clear();
  
      const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
  
      componentRef.instance.message = message;
      this.closeSub = componentRef.instance.close.subscribe(() => {
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();
      })
    }
  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }

}