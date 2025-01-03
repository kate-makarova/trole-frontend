import {Component, Input, OnInit} from '@angular/core';
import {Episode} from '../../entities/Episode';
import {EpisodeService} from '../../services/episode/episode.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Observable, of, shareReplay} from 'rxjs';
import {AsyncPipe, NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {Character} from '../../entities/Character';
import {CharacterService} from '../../services/character/character.service';

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
  characters$: Observable<Character[]> = of([]);
  showFilters: Boolean = false;
  filterBlockClass: string = 'column';
  mainBlockClass: string = 'column large-12'
  gameId: number = 0

  constructor(private episodeService: EpisodeService,
              private characterService: CharacterService,
              private route: ActivatedRoute) {
  }

  fetchData(page: number): void {
      this.episodes$ = this.episodeService.getList(this.gameId, page).pipe(shareReplay(1));
  }

  fetchCharacters(): void {
    this.characters$ = this.characterService.getCharacters(this.gameId)
  }

  onPageChange(page: number): void {
    this.fetchData(page);
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
    if (!this.showFilters) {
      this.filterBlockClass= 'column';
      this.mainBlockClass = 'column large-12'
    } else {
      this.filterBlockClass= 'column large-3';
      this.mainBlockClass = 'column large-9'
    }
  }

  ngOnInit() {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchData(1);
    this.fetchCharacters();
  }
}
