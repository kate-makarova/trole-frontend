import {Component, Input, OnInit} from '@angular/core';
import {Episode} from '../../entities/Episode';
import {EpisodeService} from '../../services/episode/episode.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Observable, of, shareReplay} from 'rxjs';
import {AsyncPipe, NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';

@Component({
  selector: 'app-episode-list',
  imports: [
    AsyncPipe,
    RouterLink,
    NgForOf,
    NgIf,
    NgSwitchCase,
    NgSwitch
  ],
  templateUrl: './episode-list.component.html',
  styleUrl: './episode-list.component.css'
})
export class EpisodeListComponent implements OnInit {
  episodes$: Observable<Episode[]> = of([]);

  constructor(private episodeService: EpisodeService,
              private route: ActivatedRoute) {
  }

  fetchData(page: number): void {
      const gameId = Number(this.route.snapshot.paramMap.get('id'));
      this.episodes$ = this.episodeService.getList(gameId, page).pipe(shareReplay(1));
  }

  onPageChange(page: number): void {
    this.fetchData(page);
  }

  ngOnInit() {
    this.fetchData(1);
  }
}
