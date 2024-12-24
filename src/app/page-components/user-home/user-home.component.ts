import {Component, OnInit} from '@angular/core';
import {Game} from '../../entities/Game';
import {GameService} from '../../services/game/game.service';
import {GameListComponent} from '../../components/game-list/game-list.component';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  imports: [
    GameListComponent
  ],
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {
  // @ts-ignore
  myGames: Observable<Game[]> = [];
  favouriteGames: Game[] = [];

  constructor(private gameService: GameService) {}

  getMyGames(): Observable<Game[]> {
    return this.myGames
  }

  getFavouriteGames(): Game[] {
    return this.favouriteGames;
  }
  ngOnInit() {
    this.myGames = this.gameService.getMyGames()
  }
}
