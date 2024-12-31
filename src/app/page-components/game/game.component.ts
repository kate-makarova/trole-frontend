import {Component, OnInit} from '@angular/core';
import {EpisodeListComponent} from '../../components/episode-list/episode-list.component';
import {Episode} from '../../entities/Episode';
import {EpisodeService} from '../../services/episode/episode.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Game} from '../../entities/Game';
import {GameService} from '../../services/game/game.service';
import {Observable, shareReplay} from 'rxjs';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {Title} from "@angular/platform-browser";
import {BreadcrumbsService} from "../../services/breadcrubs/breadcrumbs.service";
import {TopButtonsComponent} from '../../components/top-buttons/top-buttons.component';
import {TopButton} from '../../entities/TopButton';

@Component({
  selector: 'app-game',
  imports: [
    EpisodeListComponent,
    AsyncPipe,
    NgIf,
    NgForOf,
    RouterLink,
    TopButtonsComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  game$: Observable<Game> | undefined;
  episodes$: Observable<Episode[]> | undefined;
  gameId: number = 0;
  topButtons: TopButton[] = []

  constructor(private episodeService: EpisodeService,
              private gameService: GameService,
              private route: ActivatedRoute,
              private titleService: Title,
              private breadcrumbsService: BreadcrumbsService,
              ) {

  }

  fetchData(page: number): void {
    this.episodes$ = this.episodeService.getList(this.gameId, page).pipe(shareReplay(1));
  }

  onPageChange(page: number): void {
    this.fetchData(page);
  }

  ngOnInit() {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.game$ = this.gameService.get(this.gameId).pipe(shareReplay(1))
    this.game$.subscribe(game => {
      this.titleService.setTitle(game.name)
      this.breadcrumbsService.changeBreadcrumbs('game', [game.id])
      if (game.is_mine) {
        this.topButtons = [
          {
            path: '/character-crete',
            name: 'Create Character',
            class: 'button primary',
            id: 'top-button-create-character'
          },
          {
            path: '/character-episode',
            name: 'Create Episode',
            class: 'button primary',
            id: 'top-button-create-episode'
          }
        ]
      } else {
        this.topButtons = [
          {
            path: '/game-join',
            name: 'Join Game',
            class: 'button success',
            id: 'top-button-join-game'
          }
          ]
      }

    });
    this.fetchData(1)
  }
}
