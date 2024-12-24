import { Component } from '@angular/core';
import {EpisodeListComponent} from '../../components/episode-list/episode-list.component';
import {Episode} from '../../entities/Episode';
import {EpisodeService} from '../../services/episode/episode.service';
import {ActivatedRoute} from '@angular/router';
import {Game} from '../../entities/Game';
import {GameService} from '../../services/game/game.service';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-game',
  imports: [
    EpisodeListComponent,
    AsyncPipe
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  // @ts-ignore
  game: Observable<Game>;
  episodes: Episode[] = []
  gameId: number = 0

  constructor(private episodeService: EpisodeService,
              private gameService: GameService,
              private route: ActivatedRoute) {

  }

  fetchData(page: number): void {
    this.episodes = this.episodeService.getEpisodes(this.gameId, page);
  }

  onPageChange(page: number): void {
    this.fetchData(page);
  }

  ngOnInit() {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.game = this.gameService.getGame(this.gameId)
    this.fetchData(1);
  }
}
