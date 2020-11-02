import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showRules = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleRules(): void {
    this.showRules = !this.showRules;
  }
}
