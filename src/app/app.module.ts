import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainNavBarComponent } from './main-nav-bar/main-nav-bar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppStartComponent } from './app-start/app-start.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';


import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';

import {MatMenuModule} from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { AngularFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    MainNavBarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AppStartComponent,
    MainComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatInputModule,
    MatGridListModule,
    MatMenuModule,
    LayoutModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatSnackBarModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    MatProgressBarModule
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore
  ],  bootstrap: [AppComponent]
})
export class AppModule { }
