import {Component, Input} from '@angular/core';
import {Episode} from '../../entities/Episode';
import {EpisodeService} from '../../services/episode/episode.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {RouteLinkComponent} from "../route-link/route-link.component";

@Component({
  selector: 'app-episode-list',
  imports: [
    AsyncPipe,
    RouteLinkComponent
  ],
  templateUrl: './episode-list.component.html',
  styleUrl: './episode-list.component.css'
})
export class EpisodeListComponent {
  @Input() episodes: Observable<Episode[]> | undefined;

  constructor(private episodeService: EpisodeService,
              private route: ActivatedRoute) {

  }

  fetchData(page: number): void {
      const gameId = Number(this.route.snapshot.paramMap.get('id'));
      this.episodes = this.episodeService.getEpisodes(gameId, page);
  }

  onPageChange(page: number): void {
    this.fetchData(page);
  }

  ngOnInit() {
    this.fetchData(1);
  }
}
