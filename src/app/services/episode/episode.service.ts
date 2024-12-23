import { Injectable } from '@angular/core';
import {Episode} from '../../entities/Episode';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  constructor() { }

  getEpisodes(game_id: number, page: number): Episode[] {
    let title = "Episode on page "+page;
      return [
        {
          "id": 1,
          "title": title,
          "status": "active",
          "is_my_episode": true,
          "gameId": 1,
          "totalPostCount": 47,
          "lastPostDate": "2024-12-11 12:12:12",
          "lastPostCharacterName": "Antilia",
          "description": "If you have not been to Abriymoch, you have waisted your eternal life.",
          "image": "https://i.imgur.com/ODvKkP3.jpg",
          "characters": [{
            "id": 1,
            "name": "Raphael",
            "is_mine": true,
            "image": "https://forumavatars.ru/img/avatars/0019/41/ed/2188-1730347409.png"
          },
            {
              "id": 2,
              "name": "Antillia",
              "is_mine": false,
              "image": "https://forumavatars.ru/img/avatars/0019/41/ed/2202-1730347597.png"
            }],
        }
      ]
    }
}
