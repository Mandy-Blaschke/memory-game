import { Component, OnInit } from '@angular/core';
import {GameplayService} from '../gameplay.service';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss']
})
export class GameSettingsComponent implements OnInit {

  constructor(public service: GameplayService) { }

  ngOnInit(): void {
  }

}
