import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameplayComponent } from './gameplay/gameplay.component';
import { HomeComponent } from './home/home.component';
import {FormsModule} from '@angular/forms';
import { GameSettingsComponent } from './game-settings/game-settings.component';
import { ButtonComponent } from './button/button.component';
import { HeaderComponent } from './header/header.component';
import { PlayModeComponent } from './play-mode/play-mode.component';
import { PlayCardsComponent } from './play-cards/play-cards.component';
import { PlayMotivesComponent } from './play-motives/play-motives.component';
import { PlayDifficultyComponent } from './play-difficulty/play-difficulty.component';
import { PvpHeaderComponent } from './pvp-header/pvp-header.component';
import { PvcHeaderComponent } from './pvc-header/pvc-header.component';

@NgModule({
  declarations: [
    AppComponent,
    GameplayComponent,
    HomeComponent,
    GameSettingsComponent,
    ButtonComponent,
    HeaderComponent,
    PlayModeComponent,
    PlayCardsComponent,
    PlayMotivesComponent,
    PlayDifficultyComponent,
    PvpHeaderComponent,
    PvcHeaderComponent
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
