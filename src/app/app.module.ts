import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainNavBarComponent } from './main-nav-bar/main-nav-bar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppStartComponent } from './app-start/app-start.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavBarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AppStartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
