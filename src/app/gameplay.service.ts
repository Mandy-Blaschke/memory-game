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

  playMode: 'player' | 'pvc' = 'player';

  fieldSize = 20;

  fieldCards: GameCard[] = [];

  visibleCards: GameCard[] = [];

  foundPairs: GameCard[] = [];

  canInteract = true;

  startedGame = false;

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
    this.router.navigate(['game']);
    this.createField(this.getMotiveArray());
  }

  createField(array: string[]): void {
    if (this.fieldSize <= 33 && this.fieldSize >= 2) {
      this.endGame();
      const arrayCopy = [...array];
      while (this.fieldCards.length < this.fieldSize * 2) {
        const cardOne: GameCard = this.getCardFromArray(arrayCopy);
        const cardTwo = {...cardOne, id: this.createRandomId()};

        if (!this.fieldCards.find((card) => card.pic === cardOne.pic)) {
          this.fieldCards.push(cardOne);
          this.fieldCards.push(cardTwo);
        }

      }
      this.shuffleCards();
      this.startedGame = true;
    } else {
      alert('Feldgröße');
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
    // TODO: Neues Spiel? einbauen
    this.router.navigate(['start']);
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
    }, 1500);
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
