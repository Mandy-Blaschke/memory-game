import { Component, OnInit } from '@angular/core';
import {GameplayService} from '../gameplay.service';

@Component({
  selector: 'app-play-difficulty',
  templateUrl: './play-difficulty.component.html',
  styleUrls: ['./play-difficulty.component.scss']
})
export class PlayDifficultyComponent implements OnInit {

  constructor(public service: GameplayService) { }

  ngOnInit(): void {
  }

}
