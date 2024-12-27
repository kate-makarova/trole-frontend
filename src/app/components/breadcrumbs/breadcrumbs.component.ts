import {Component, OnInit} from '@angular/core';
import {BreadcrumbsService} from '../../services/breadcrubs/breadcrumbs.service';
import {RouteLinkComponent} from '../route-link/route-link.component';

@Component({
  selector: 'app-breadcrumbs',
  imports: [
    RouteLinkComponent
  ],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent implements OnInit {

  breadcrumbs: {name: string, path: string, order: number}[] = []

  constructor(private breadcrumbsService: BreadcrumbsService) {
  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs$.subscribe(breadcrumbs => this.breadcrumbs = breadcrumbs);
  }

}
