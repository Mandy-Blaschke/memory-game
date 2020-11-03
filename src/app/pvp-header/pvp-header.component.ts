import { Component, OnInit } from '@angular/core';
import {GameplayService} from '../gameplay.service';

@Component({
  selector: 'app-pvp-header',
  templateUrl: './pvp-header.component.html',
  styleUrls: ['./pvp-header.component.scss']
})
export class PvpHeaderComponent implements OnInit {

  constructor(public service: GameplayService) { }

  ngOnInit(): void {
  }

}
