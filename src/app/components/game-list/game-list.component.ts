import {Component, Input} from '@angular/core';
import {Game} from '../../entities/Game';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {BreadcrumbsService} from '../../services/breadcrubs/breadcrumbs.service';
import {RouteLinkComponent} from '../route-link/route-link.component';

@Component({
  selector: 'app-game-list',
  imports: [
    AsyncPipe,
    RouteLinkComponent
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
