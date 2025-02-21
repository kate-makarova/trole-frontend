import {Component, OnInit} from '@angular/core';
import {Character} from '../../entities/Character';
import {Observable, of, shareReplay} from 'rxjs';
import {CharacterService} from '../../services/character/character.service';
import {ActivatedRoute} from '@angular/router';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {BreadcrumbsService} from "../../services/breadcrubs/breadcrumbs.service";
import {PlaceholderImageComponent} from '../../components/placeholder-image/placeholder-image.component';

@Component({
  selector: 'app-character-list',
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    PlaceholderImageComponent
  ],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent implements OnInit {
  characters: Observable<Character[]> = of([]);
  gameId: number = 0;
  activeCharacters: Observable<Character[]> = of([]);
  inactiveCharacters: Observable<Character[]> = of([]);

  constructor(private characterService: CharacterService,
              private route: ActivatedRoute,
              private breadcrumbsService: BreadcrumbsService) {
  }

  ngOnInit() {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.characterService.loadList(this.gameId, 0);
    this.characters = this.characterService.getList().pipe(shareReplay(1));
    this.characters.subscribe((characters: Character[]) => {
      const activeCharacters = characters.filter((character: Character)  => character.status == 1);
      const inactiveCharacters: Character[] = characters.filter((character: Character) => character.status != 1);
      this.activeCharacters = of(activeCharacters);
      this.inactiveCharacters = of(inactiveCharacters);
    })
    this.breadcrumbsService.changeBreadcrumbs('character-list', [this.gameId]);
  }
}
