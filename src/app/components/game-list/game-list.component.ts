import {Component, Input} from '@angular/core';
import {Game} from '../../entities/Game';
import {Observable} from 'rxjs';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {BreadcrumbsService} from '../../services/breadcrubs/breadcrumbs.service';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-game-list',
    imports: [
        AsyncPipe,
        NgForOf,
        RouterLink,
        NgIf
    ],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent {
  // @ts-ignore
  @Input('games') games: Observable<Game[]> = []

  constructor(private breadcrumbsService: BreadcrumbsService) {
  }

  updateBreadcrumbs(path: string, name: string) {
    this.breadcrumbsService.addBreadcrumb(path, name);
  }

}
