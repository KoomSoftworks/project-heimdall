import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatGridListModule } from '@angular/material/grid-list';

import {MatMenuModule} from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerModule } from "ngx-spinner";
import { AngularFirestore } from '@angular/fire/firestore';
import { SendEComponent } from './send-e/send-e.component';


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
    SendEComponent,
  ],
  imports: [
    HttpClientModule,
    HttpClientTestingModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatInputModule,
    MatGridListModule,
    MatMenuModule,
    LayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatSnackBarModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatTabsModule,
    MatDividerModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatProgressBarModule
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore,
    
  ],  bootstrap: [AppComponent]
})
export class AppModule { }
