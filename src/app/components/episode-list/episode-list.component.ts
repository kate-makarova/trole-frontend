import {Component, Input} from '@angular/core';
import {Episode} from '../../entities/Episode';
import {EpisodeService} from '../../services/episode/episode.service';
import {ActivatedRoute} from '@angular/router';
import {PaginationComponent} from '../pagination/pagination.component';

@Component({
  selector: 'app-episode-list',
  imports: [
    PaginationComponent
  ],
  templateUrl: './episode-list.component.html',
  styleUrl: './episode-list.component.css'
})
export class EpisodeListComponent {
  @Input() episodes!: Episode[];

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
