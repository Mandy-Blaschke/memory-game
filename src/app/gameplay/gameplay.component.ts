import {Component, OnInit} from '@angular/core';
import {cats} from './motive';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.scss']
})
export class GameplayComponent implements OnInit {

  constructor() {
  }

  fieldCards: GameCard[] = [];

  visibleCards: GameCard[] = [];

  foundPairs: GameCard[] = [];

  canInteract = true;

  fieldsize = 32;

  startedGame = false;

  ngOnInit(): void {
  }

  startGame(): void {
    this.createField(cats);
  }

  createField(array: string[]): void {
    this.endGame();
    const arrayCopy = [...array];
    while (this.fieldCards.length < this.fieldsize * 2) {
      const cardOne: GameCard = this.getCardFromArray(arrayCopy);
      const cardTwo = {...cardOne, id: this.createRandomId()};

      if (!this.fieldCards.find((card) => card.pic === cardOne.pic)) {
        this.fieldCards.push(cardOne);
        this.fieldCards.push(cardTwo);
      }

    }
    this.shuffleCards();
    this.startedGame = true;
  }

  shuffleCards(): void {
    for (let i = 0; i < this.fieldsize * 2; i++) {
      this.fieldCards.sort(() => Math.random() > 0.5 ? -1 : 1);
    }
  }

  getCardFromArray(array: string[]): GameCard {
    const index = this.createRandomIndex(array);
    const pic = array[index];
    array.splice(array.indexOf(pic), 1);
    const card: GameCard = {
      pic,
      visible: false,
      id: this.createRandomId(),
    };
    return card;
  }

  createRandomIndex(array: string[]): number {
    return Math.floor(Math.random() * array.length);
  }

  createRandomId(): number {
    return Math.floor(Math.random() * 10000);
  }

  nextPlayersTurn(): void {
    console.log('Next players turn');
  }

  endGame(): void {
    this.fieldCards = [];
    this.visibleCards = [];
    this.foundPairs = [];
  }

  showCard(card: GameCard): void {
    if (!this.canInteract) {
      return;
    }
    if (this.canViewCard()) {
      if (!card.visible) {
        card.visible = true;
        this.visibleCards.push(card);
      }
    }
    if (this.visibleCards.length === 2) {
      if (this.visibleCards[0].pic === this.visibleCards[1].pic) {
        this.foundPair();
      } else {
        this.noPairFound();
      }
    }
  }

  canViewCard(): boolean {
    return this.visibleCards.length < 2;
  }

  noPairFound(): void {
    this.canInteract = false;
    setTimeout(() => {
      this.visibleCards[0].visible = false;
      this.visibleCards[1].visible = false;
      this.visibleCards = [];
      this.canInteract = true;
    }, 2000);
    this.nextPlayersTurn();
  }

  foundPair(): void {
    this.foundPairs.push(this.visibleCards[0]);
    this.foundPairs.push(this.visibleCards[1]);
    this.visibleCards = [];

    if (this.foundPairs.length === this.fieldCards.length) {
      this.endGame();
    }
  }

}

export interface GameCard {
  pic: string;
  visible: boolean;
  id: number;
}

/*


  dogPics: string[] = [];

  colorPics: string[] = [];

  numberPics: string[] = [];

  peoplePics: string[] = [];

  objectPics: string[] = [];
 */





