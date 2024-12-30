import {Component, OnInit} from '@angular/core';
import {Game} from '../../entities/Game';
import {GameService} from '../../services/game/game.service';
import {GameListComponent} from '../../components/game-list/game-list.component';
import {Observable} from 'rxjs';
import {Title} from "@angular/platform-browser";

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

  constructor(private gameService: GameService,
              private titleService: Title) {
    this.titleService.setTitle('My Games');
  }

  getMyGames(): Observable<Game[]> {
    return this.myGames
  }
  ngOnInit() {
    this.myGames = this.gameService.getMyGames()
  }
}
