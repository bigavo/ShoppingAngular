import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component } from "@angular/core";
import { timeout } from 'rxjs/operators';
@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    constructor(private authService:AuthService){}
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }
    
    onSubmit(form: NgForm){
        if (!form.valid) {
            return;
          }
          const email = form.value.email;
          const password = form.value.password;
      
          this.isLoading = true;
          if (this.isLoginMode) {
            // ...
          } else {
            this.authService.signup(email, password).subscribe(
              resData => {
                
                console.log(resData);
                this.isLoading = false;
              },
              errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage;
                this.isLoading = false;
              }
            );
          }
          form.reset();
        }
}