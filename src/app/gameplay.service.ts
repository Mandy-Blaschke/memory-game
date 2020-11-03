import {Injectable} from '@angular/core';
import {cats, dogs, objects, people} from './gameplay/motive';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameplayService {

  constructor(private router: Router) {
  }

  motive = 'cats';
  motives = [
    {value: 'cats', title: 'Katzen'},
    {value: 'dogs', title: 'Hunde'},
    {value: 'people', title: 'Menschen'},
    {value: 'objects', title: 'Objekte'},
    {value: 'mixed', title: 'Gemischt'}
  ];

  diff: string;
  difficulty = [
    {value: 'easy', title: 'Leicht'},
    {value: 'middle', title: 'Mittel'},
    {value: 'hard', title: 'Schwer'},
  ];

  playMode: 'single' | 'pvp' | 'pvc' = undefined;

  fieldSize = 20;

  canInteract = true;
  startedGame = false;
  finishedGame = false;

  fieldCards: GameCard[] = [];
  visibleCards: GameCard[] = [];
  foundPairs: GameCard[] = [];
  onceWasVisibleCard = new Set<GameCard>();

  foundPairsPlayerOne = 0;
  foundPairsPlayerTwo = 0;

  firstPlayersTurn = true;
  secondPlayersTurn = false;
  playerOneWon = false;
  playerTwoWon = false;

  getPickableCards(): GameCard[] {
    return this.fieldCards.filter((card) => !this.foundPairs.includes(card));
  }


  computersTurn(): void {
    if (this.playMode === 'pvc') {
      if (this.secondPlayersTurn) {
        this.canInteract = false;

        // TODO mehr Schwierigkeitsstufen

        const easyCards = this.getPickableCards();
        const compPickOne: GameCard = easyCards[Math.floor(Math.random() * easyCards.length)];

        let compPickTwo: GameCard = compPickOne;
        while (compPickTwo === compPickOne) {
          compPickTwo = easyCards[Math.floor(Math.random() * easyCards.length)];
        }

        setTimeout(() => {
          compPickOne.visible = true;
          this.visibleCards.push(compPickOne);
          this.onceWasVisibleCard.add(compPickOne);

          compPickTwo.visible = true;
          this.visibleCards.push(compPickTwo);
          this.onceWasVisibleCard.add(compPickTwo);

          this.checkForPair();
        }, 1500);
      }
    }
  }


  getMotiveArray(): string[] {
    switch (this.motive) {
      case 'cats':
        return cats;
      case 'dogs':
        return dogs;
      case 'people':
        return people;
      case 'object':
        return objects;
      case 'mixed':
        return cats.concat(dogs, people, objects);
    }
  }

  startGame(): void {
    if (this.playMode !== undefined) {
      this.router.navigate(['game']);
      this.clearField();
      this.finishedGame = false;
      this.createField(this.getMotiveArray());
      this.startedGame = true;
    } else {
      alert('Wähle einen Spielmodus.');
    }
  }

  createField(array: string[]): void {
    if (this.fieldSize <= 33 && this.fieldSize >= 2) {
      this.clearField();
      const arrayCopy = [...array];
      while (this.fieldCards.length < this.fieldSize * 2) {
        const cardOne: GameCard = this.getCardFromArray(arrayCopy);
        const cardTwo = {...cardOne};

        if (!this.fieldCards.find((card) => card.pic === cardOne.pic)) {
          this.fieldCards.push(cardOne);
          this.fieldCards.push(cardTwo);
        }
      }
      this.shuffleCards();
      this.startedGame = true;
    } else {
      alert('Feldgröße stimmt nicht!');
    }
  }

  shuffleCards(): void {
    for (let i = 0; i < this.fieldSize * 2; i++) {
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
    };
    return card;
  }

  createRandomIndex(array: string[]): number {
    return Math.floor(Math.random() * array.length);
  }

  nextPlayersTurn(): void {
    setTimeout(() => {
      if (this.firstPlayersTurn) {
        this.secondPlayersTurn = true;
        this.firstPlayersTurn = false;
        this.computersTurn();
      } else {
        this.secondPlayersTurn = false;
        this.firstPlayersTurn = true;
      }
    }, 1500);
  }

  clearField(): void {
    this.fieldCards = [];
    this.visibleCards = [];
    this.foundPairs = [];
    this.onceWasVisibleCard.clear();
    this.foundPairsPlayerOne = 0;
    this.foundPairsPlayerTwo = 0;
    this.firstPlayersTurn = true;
    this.secondPlayersTurn = false;
    this.playerOneWon = false;
    this.playerTwoWon = false;
  }

  showCard(card: GameCard): void {
    if (!this.canInteract) {
      return;
    }
    if (this.canViewCard()) {
      if (!card.visible) {
        card.visible = true;
        this.visibleCards.push(card);
        this.onceWasVisibleCard.add(card);
      }
    }
    this.checkForPair();
  }

  checkForPair(): void {
    if (this.visibleCards.length === 2) {
      if (this.visibleCards[0].pic === this.visibleCards[1].pic) {
        this.foundPair();
        this.computersTurn();
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
    }, 1500);
    this.nextPlayersTurn();
  }

  foundPair(): void {
    this.foundPairs.push(this.visibleCards[0], this.visibleCards[1]);
    this.countScores();
    this.visibleCards = [];

    if (this.foundPairs.length === this.fieldCards.length) {
      this.endGame();
    }
  }

  countScores(): void {
    if (this.firstPlayersTurn) {
      this.foundPairsPlayerOne++;
    } else {
      this.foundPairsPlayerTwo++;
    }
  }

  getWinner(): void {
    if (this.foundPairsPlayerTwo > this.foundPairsPlayerOne) {
      this.playerTwoWon = true;
    } else {
      this.playerOneWon = true;
    }
  }

  endGame(): void {
    this.clearField();
    this.getWinner();
    this.finishedGame = true;
  }

}

export interface GameCard {
  pic: string;
  visible: boolean;
}
