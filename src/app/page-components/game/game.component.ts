import {Component, OnInit} from '@angular/core';
import {EpisodeListComponent} from '../../components/episode-list/episode-list.component';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Game} from '../../entities/Game';
import {GameService} from '../../services/game/game.service';
import {Observable, of, shareReplay} from 'rxjs';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {Title} from "@angular/platform-browser";
import {BreadcrumbsService} from "../../services/breadcrubs/breadcrumbs.service";
import {TopButtonsComponent} from '../../components/top-buttons/top-buttons.component';
import {TopButton} from '../../entities/TopButton';
import {PlaceholderImageComponent} from '../../components/placeholder-image/placeholder-image.component';
import {SessionService} from "../../services/session/session.service";
import {HttpErrorsComponent} from "../../components/http-errors/http-errors.component";

@Component({
  selector: 'app-game',
  imports: [
    EpisodeListComponent,
    AsyncPipe,
    NgIf,
    NgForOf,
    RouterLink,
    TopButtonsComponent,
    PlaceholderImageComponent,
    HttpErrorsComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  game$: Observable<Game|null> = of(null);
  gameId: number = 0;
  topButtons: TopButton[] = []
  leaveAlert: boolean = false;
  errorCode: Observable<number>;

  constructor(
              private gameService: GameService,
              private route: ActivatedRoute,
              private titleService: Title,
              private breadcrumbsService: BreadcrumbsService,
              private sessionService: SessionService,
              ) {
    this.errorCode = this.gameService.httpStatus.asObservable();
  }

  gameJoin() {
    this.gameService.join(this.gameId).subscribe(game => {
      this.gameService.load(this.gameId)
      this.game$ = this.gameService.get().pipe(shareReplay(1));
      this.game$.subscribe(game => {
        if(game == null){return}
        this.breadcrumbsService.changeBreadcrumbs('game', [game.id])
        this.setTopButtons(game)
      });
    })
  }

  gameLeaveAlert() {
    this.leaveAlert = true;
  }

  setTopButtons(game: Game) {
    if(this.sessionService.getUser() == null){
      return;
    }
    if (game.is_mine) {
      const create_episode_button =           {
        path: '/episode-create/'+this.gameId,
        name: 'Create Episode',
        class: 'button primary',
        id: 'top-button-create-episode',
        click: null
      }
      if (game.my_characters.length == 0) {
        create_episode_button.class += ' disabled'
      }
      this.topButtons = [
        {
          path: null,
          name: 'Leave game',
          class: 'button alert',
          id: 'top-button-game-leave',
          click: this.gameLeaveAlert.bind(this)
        },
        create_episode_button,
        {
          path: '/character-create/'+this.gameId,
          name: 'Create Character',
          class: 'button primary',
          id: 'top-button-character-create',
          click: null
        }
      ]
    } else {
      this.topButtons = [
        {
          path: null,
          name: 'Join game',
          class: 'button success',
          id: 'top-button-join-game',
          click: this.gameJoin.bind(this)
        }
      ]
    }

    if(game.can_admin) {
      this.topButtons.push({
        path: '/game-settings/game-edit/'+this.gameId,
        name: 'Game Settings',
        class: 'button secondary',
        id: 'top-button-game-settings',
        click: null
      })
    }
  }

  ngOnInit() {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.gameService.load(this.gameId)
    this.game$ = this.gameService.get().pipe(shareReplay(1))
    this.game$.subscribe(game => {
      if(game == null){return}
      this.titleService.setTitle(game.name)
      this.breadcrumbsService.changeBreadcrumbs('game', [game.id])
      this.setTopButtons(game)
    });
  }

  leaveAlertCancel() {
    this.leaveAlert = false;
  }

  leaveGame() {
    this.gameService.leave(this.gameId).subscribe((response: boolean) => {
      this.leaveAlert = false;
      this.gameService.load(this.gameId);
    })
  }
}
