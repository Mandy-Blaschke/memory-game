import { Component, OnInit } from '@angular/core';
import {GameplayService} from '../gameplay.service';

@Component({
  selector: 'app-finished-game',
  templateUrl: './finished-game.component.html',
  styleUrls: ['./finished-game.component.scss']
})
export class FinishedGameComponent implements OnInit {

  constructor(public service: GameplayService) { }

  ngOnInit(): void {
  }

}
