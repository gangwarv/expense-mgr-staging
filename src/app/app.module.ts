import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { LayoutModule } from '@angular/cdk/layout';

import { environment } from './../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { MaterialModule } from './material.module';
import { NavbarComponent } from './navbar/navbar.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { itemEffects } from './effects/item.effects';
import { itemReducer, billReducer } from './reducers';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatInputModule, MatSelectModule, MatRadioModule, MatCardModule, MatGridListModule, MatMenuModule } from '@angular/material';
import { AddBillComponent } from './add-bill/add-bill.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BillsEffect } from './effects/bill.effect';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AddBillComponent,
    DashboardComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    StoreModule.forRoot({
      items: itemReducer,
      bills: billReducer
    }),
    EffectsModule.forRoot([
      itemEffects,
      BillsEffect
    ]),
    StoreDevtoolsModule.instrument({}),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
