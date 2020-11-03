import { Component, OnInit } from '@angular/core';
import {GameplayService} from '../gameplay.service';

@Component({
  selector: 'app-pvc-header',
  templateUrl: './pvc-header.component.html',
  styleUrls: ['./pvc-header.component.scss']
})
export class PvcHeaderComponent implements OnInit {

  constructor(public service: GameplayService) { }

  ngOnInit(): void {
  }

}
