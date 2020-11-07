import {Injectable} from '@angular/core';
import {cats, dogs, objects, people} from './gameplay/motive';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameplayService {
  errorFieldsize = false;
  errorPlayMode = false;

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

  diff = 'middle';
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

  startGame(): void {
    if (this.playMode !== undefined && this.fieldSize <= 33 && this.fieldSize >= 2) {
      this.router.navigate(['game']);
      this.foundPairsPlayerOne = 0;
      this.foundPairsPlayerTwo = 0;
      this.clearField();
      this.finishedGame = false;
      this.createField(this.getMotiveArray());
      this.startedGame = true;
    } else {
      if (this.playMode === undefined) {
        this.errorPlayMode = true;
      }
      if (this.fieldSize > 33 || this.fieldSize < 2) {
        this.errorFieldsize = true;
      }
    }
  }

  endGame(): void {
    this.clearField();
    this.getWinner();
    this.finishedGame = true;
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

  private getPickableCards(): GameCard[] {
    return this.fieldCards.filter((card) => !this.foundPairs.includes(card));
  }

  private computersTurn(): void {
    if (this.playMode === 'pvc') {
      if (this.secondPlayersTurn) {
        this.canInteract = false;

        const pickableCards = this.getPickableCards();
        const compPickOne: GameCard = pickableCards[Math.floor(Math.random() * pickableCards.length)];

        let compPickTwo: GameCard = compPickOne;

        compPickTwo = this.smartCompMoveByDiff(compPickTwo, compPickOne);

        while (compPickTwo === compPickOne) {
          compPickTwo = pickableCards[Math.floor(Math.random() * pickableCards.length)];
        }

        this.compMakesMove(compPickOne, compPickTwo);
      }
    }
  }

  private compMakesMove(compPickOne: GameCard, compPickTwo: GameCard): void {
    setTimeout(() => {
      compPickOne.visible = true;
      this.visibleCards.push(compPickOne);
      this.onceWasVisibleCard.add(compPickOne);

      setTimeout(() => {
        compPickTwo.visible = true;
        this.visibleCards.push(compPickTwo);
        this.onceWasVisibleCard.add(compPickTwo);
        this.checkForPair();
      }, 750);
    }, 750);
  }

  private smartCompMoveByDiff(compPickTwo: GameCard, compPickOne: GameCard): GameCard {
    let doMiddleMove = false;
    let doHardMove = false;

    const rollDice = Math.random();

    if (this.diff === 'easy') {
      if (rollDice > 0.5) {
        doMiddleMove = true;
      }
    }

    if (this.diff === 'middle' && rollDice > 0.2) {
      if (rollDice <= 0.7) {
        doMiddleMove = true;
      } else {
        doHardMove = true;
      }
    }

    if (this.diff === 'hard' && rollDice > 0.1) {
      if (rollDice <= 0.5) {
        doMiddleMove = true;
      } else {
        doHardMove = true;
      }
    }

    if (doMiddleMove || doHardMove) {
      const onceVisibleCanBeTaken = Array.from(this.onceWasVisibleCard).filter((card) => {
        return !this.visibleCards.includes(card) && !this.foundPairs.includes(card);
      });
      if (onceVisibleCanBeTaken.length > 0) {
        if (doMiddleMove) {
          compPickTwo = onceVisibleCanBeTaken[Math.floor(Math.random() * onceVisibleCanBeTaken.length)];
        } else if (doHardMove) {
          compPickTwo = onceVisibleCanBeTaken.find((card) => card.pic === compPickOne.pic) || compPickOne;
        }
      }
    }
    return compPickTwo;
  }

  private getMotiveArray(): string[] {
    switch (this.motive) {
      case 'cats':
        return cats;
      case 'dogs':
        return dogs;
      case 'people':
        return people;
      case 'objects':
        return objects;
      case 'mixed':
        return cats.concat(dogs, people, objects);
    }
  }

  private createField(array: string[]): void {
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
  }

  private shuffleCards(): void {
    for (let i = 0; i < this.fieldSize * 2; i++) {
      this.fieldCards.sort(() => Math.random() > 0.5 ? -1 : 1);
    }
  }

  private getCardFromArray(array: string[]): GameCard {
    const index = this.createRandomIndex(array);
    const pic = array[index];
    array.splice(array.indexOf(pic), 1);
    const card: GameCard = {
      pic,
      visible: false,
    };
    return card;
  }

  private createRandomIndex(array: string[]): number {
    return Math.floor(Math.random() * array.length);
  }

  private nextPlayersTurn(): void {
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

  private clearField(): void {
    this.fieldCards = [];
    this.visibleCards = [];
    this.foundPairs = [];
    this.onceWasVisibleCard.clear();
    this.firstPlayersTurn = true;
    this.secondPlayersTurn = false;
    this.playerOneWon = false;
    this.playerTwoWon = false;
  }

  private checkForPair(): void {
    if (this.visibleCards.length === 2) {
      if (this.visibleCards[0].pic === this.visibleCards[1].pic) {
        this.foundPair();
        this.computersTurn();
      } else {
        this.noPairFound();
      }
    }
  }

  private canViewCard(): boolean {
    return this.visibleCards.length < 2;
  }

  private noPairFound(): void {
    this.canInteract = false;
    setTimeout(() => {
      this.visibleCards[0].visible = false;
      this.visibleCards[1].visible = false;
      this.visibleCards = [];
      this.canInteract = true;
    }, 1500);
    this.nextPlayersTurn();
  }

  private foundPair(): void {
    this.foundPairs.push(this.visibleCards[0], this.visibleCards[1]);
    this.countScores();
    this.visibleCards = [];

    if (this.foundPairs.length === this.fieldCards.length) {
      this.endGame();
    }
  }

  private countScores(): void {
    if (this.firstPlayersTurn) {
      this.foundPairsPlayerOne++;
    } else {
      this.foundPairsPlayerTwo++;
    }
  }

  private getWinner(): void {
    if (this.foundPairsPlayerTwo > this.foundPairsPlayerOne) {
      this.playerTwoWon = true;
    } else {
      this.playerOneWon = true;
    }
  }

}

export interface GameCard {
  pic: string;
  visible: boolean;
}
