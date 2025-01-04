import {Component, OnInit} from '@angular/core';
import {Game} from '../../entities/Game';
import {GameService} from '../../services/game/game.service';
import {GameListComponent} from '../../components/game-list/game-list.component';
import {Observable, of} from 'rxjs';
import {Title} from "@angular/platform-browser";
import {BreadcrumbsService} from "../../services/breadcrubs/breadcrumbs.service";
import {TopButtonsComponent} from '../../components/top-buttons/top-buttons.component';
import {TopButton} from '../../entities/TopButton';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  imports: [
    GameListComponent,
    TopButtonsComponent
  ],
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {

  myGames$: Observable<Game[]> = of([]);
  topButtons: TopButton[] = []

  constructor(private gameService: GameService,
              private titleService: Title,
              private breadcrumbsService: BreadcrumbsService,
              ) {
    this.titleService.setTitle('My Games');
  }

  getMyGames(): Observable<Game[]> {
    return this.myGames$
  }
  ngOnInit() {
    this.topButtons = [
      {
        path: '/game-create',
        name: 'Create Game',
        class: 'button success',
        id: 'top-button-create-game',
        click: null
      }
    ]
    this.myGames$ = this.gameService.getMyGames()
    this.breadcrumbsService.setBreadcrumbs([{name: 'My Games', path: '/home'}])
  }
}
