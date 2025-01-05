import {Component, OnInit} from '@angular/core';
import {Character} from '../../entities/Character';
import {Observable} from 'rxjs';
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
  characters: Observable<Character[]> | undefined;
  gameId: number = 0;

  constructor(private characterService: CharacterService,
              private route: ActivatedRoute,
              private breadcrumbsService: BreadcrumbsService) {
  }

  ngOnInit() {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.characters = this.characterService.getCharacters(this.gameId);
    this.breadcrumbsService.changeBreadcrumbs('character-list', [this.gameId]);
  }
}
