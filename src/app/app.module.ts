import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameplayComponent } from './gameplay/gameplay.component';
import { HomeComponent } from './home/home.component';
import {FormsModule} from '@angular/forms';
import { GameSettingsComponent } from './game-settings/game-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    GameplayComponent,
    HomeComponent,
    GameSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
