import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameplayComponent} from './gameplay/gameplay.component';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'game', component: GameplayComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
