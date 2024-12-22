import { Injectable } from '@angular/core';
import {Game} from '../../entities/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private myGames: Game[];
  private favouriteGames: Game[];

  constructor(myGames: Game[] = [], favouriteGames: Game[] = []) {
    this.myGames = [
      {
        "id": 1,
        "title": "The City of Sin",
        "totalPostCount": 47,
        "weeklyPostCount": 10,
        "description": "If you have not been to Abriymoch, you have waisted your eternal life.",
        "image": "https://i.imgur.com/ODvKkP3.jpg",
        "myCharacters": [{
          "id": 1,
          "name": "Raphael",
          "is_mine": true,
          "image": "https://forumavatars.ru/img/avatars/0019/41/ed/2188-1730347409.png"
        }],
        "genres": [{
          "id": 1,
          "name": "Fantasy"
        }],
        "fandoms": [{
          "id": 1,
          "name": "Baldur's Gate III"
        }],
        "media": [{
          "id": 1,
          "name": "Games"
        }]
      },
      {
        "id": 2,
        "title": "Woof Like a Dog",
        "totalPostCount": 37,
        "weeklyPostCount": 5,
        "description": "Не ходите, волки, по лесу гулять. Там, в лесу, есть вещи пострашнее вас.",
        "image": "https://i.imgur.com/cpYFElh.png",
        "myCharacters": [{
          "id": 1,
          "name": "Raphael",
          "is_mine": true,
          "image": "https://forumavatars.ru/img/avatars/0019/41/ed/2188-1730347409.png"
        }],
        "genres": [{
          "id": 1,
          "name": "Fantasy"
        }],
        "fandoms": [{
          "id": 1,
          "name": "Baldur's Gate III"
        }],
        "media": [{
          "id": 1,
          "name": "Games"
        }]
      },
    ];
    this.favouriteGames = favouriteGames;
  }

  getMyGames(): Game[] {
    return this.myGames
  }
}
