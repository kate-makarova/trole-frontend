import {Component, OnInit} from '@angular/core';
import {Game} from '../../entities/Game';
import {GameService} from '../../services/game/game.service';
import {GameListComponent} from '../../components/game-list/game-list.component';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  imports: [
    GameListComponent
  ],
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {
  myGames: Game[] = [];
  favouriteGames: Game[] = [];

  constructor(private gameService: GameService) {}

  getMyGames(): Game[] {
    return this.myGames
  }

  getFavouriteGames(): Game[] {
    return this.favouriteGames;
  }
  ngOnInit() {
    this.myGames = this.gameService.getMyGames()
  }
}
