import {Component, OnInit} from '@angular/core';
import {GameplayService} from '../gameplay.service';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.scss']
})
export class GameplayComponent implements OnInit {



  constructor(public service: GameplayService) {
  }

  ngOnInit(): void {
  }



}







