import {Component, OnInit} from '@angular/core';
import {GameplayService} from '../gameplay.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.scss']
})
export class GameplayComponent implements OnInit {



  constructor(public service: GameplayService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.service.startedGame === false) {
      this.router.navigate(['settings']);
    }
  }



}







