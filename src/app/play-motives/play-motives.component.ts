import { Component, OnInit } from '@angular/core';
import {GameplayService} from '../gameplay.service';

@Component({
  selector: 'app-play-motives',
  templateUrl: './play-motives.component.html',
  styleUrls: ['./play-motives.component.scss']
})
export class PlayMotivesComponent implements OnInit {

  constructor(public service: GameplayService) { }

  ngOnInit(): void {
  }

}
