import {Component, OnInit} from '@angular/core';
import {EpisodeListComponent} from '../../components/episode-list/episode-list.component';
import {Episode} from '../../entities/Episode';
import {EpisodeService} from '../../services/episode/episode.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Game} from '../../entities/Game';
import {GameService} from '../../services/game/game.service';
import {Observable, shareReplay} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {RouteLinkComponent} from "../../components/route-link/route-link.component";

@Component({
  selector: 'app-game',
    imports: [
        EpisodeListComponent,
        AsyncPipe,
        RouteLinkComponent
    ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  game$: Observable<Game> | undefined;
  episodes$: Observable<Episode[]> | undefined;
  gameId: number = 0

  constructor(private episodeService: EpisodeService,
              private gameService: GameService,
              private route: ActivatedRoute) {

  }

  fetchData(page: number): void {
    this.episodes$ = this.episodeService.getList(this.gameId, page).pipe(shareReplay(1));
  }

  onPageChange(page: number): void {
    this.fetchData(page);
  }

  ngOnInit() {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.game$ = this.gameService.get(this.gameId).pipe(shareReplay(1));
    this.fetchData(1)
  }
}
