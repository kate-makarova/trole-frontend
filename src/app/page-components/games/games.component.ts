import {Component, OnInit} from '@angular/core';
import {Observable, of, shareReplay} from "rxjs";
import {Game} from "../../entities/Game";
import {TopButton} from "../../entities/TopButton";
import {GameService} from "../../services/game/game.service";
import {Title} from "@angular/platform-browser";
import {BreadcrumbsService} from "../../services/breadcrubs/breadcrumbs.service";
import {SessionService} from "../../services/session/session.service";
import {GameListComponent} from "../../components/game-list/game-list.component";
import {TopButtonsComponent} from "../../components/top-buttons/top-buttons.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-games',
  imports: [
    GameListComponent,
    TopButtonsComponent,
    NgIf
  ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent implements OnInit {

  games$: Observable<Game[]> = of([]);
  topButtons: TopButton[] = []
  is_guest: boolean = false;

  constructor(private gameService: GameService,
              private titleService: Title,
              private breadcrumbsService: BreadcrumbsService,
              private sessionService: SessionService,
  ) {
    this.titleService.setTitle('My Games');
  }
  ngOnInit() {
    if (this.sessionService.getUser() != null) {
      this.topButtons = [
        {
          path: '/game-create',
          name: 'Create Game',
          class: 'button success',
          id: 'top-button-create-game',
          click: null
        }
      ]
    } else {
      this.is_guest = true;
    }
    this.titleService.setTitle(
      'My Games'
    )
    this.gameService.loadAllGames()
    this.games$ = this.gameService.getList().pipe(shareReplay(1))
    this.breadcrumbsService.setBreadcrumbs([{name: 'Games', path: '/games'}])
  }
}
