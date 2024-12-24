import { Injectable } from '@angular/core';
import {Game} from '../../entities/Game';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../../entities/ApiResponse';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) {
  }

  getMyGames(): Observable<Game[]> {
    const apiHost = environment.apiHost;
    const response = this.http.get<ApiResponse>(apiHost+'/home')
    return response.pipe(map((resp) => resp.data as Game[]))
  }

  getGame(id: number): Game {
    return {
      "id": 1,
      "name": "Infernal Games",
      "total_posts": 47,
      "description": "A very specific take on D&D focused on the devils and the affairs of the Hells",
      "image": "https://i.imgur.com/ODvKkP3.jpg",
      "my_characters": [{
        "id": 1,
        "name": "Raphael",
        "is_mine": true,
        "avatar": "https://forumavatars.ru/img/avatars/0019/41/ed/2188-1730347409.png"
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
    }
  }
}
