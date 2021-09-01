import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import{Component} from '@angular/core'
import { OnInit, OnDestroy } from '@angular/core';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'

})
export class HeaderComponent implements OnInit { 
    isAuthenticated = false;
    private userSub: Subscription;
    
    constructor(private dataStorageService: DataStorageService, private authService: AuthService){}

    ngOnInit(){
        this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
            console.log(!user);
            console.log(!!user);
        });
    }

    onSaveData(){
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes();
      }
    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
    onLogout(){
        this.authService.logout();

    }
}