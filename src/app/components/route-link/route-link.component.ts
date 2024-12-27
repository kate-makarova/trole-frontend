import {Component, Input} from '@angular/core';
import {BreadcrumbsService} from '../../services/breadcrubs/breadcrumbs.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-route-link',
  imports: [
    RouterLink
  ],
  templateUrl: './route-link.component.html',
  styleUrl: './route-link.component.css'
})
export class RouteLinkComponent {
  @Input('path') path: string = '';
  @Input('name') name: string = '';
  @Input('order') order: number = -1;

  constructor(private breadcrumbsService: BreadcrumbsService) {
  }

  updateBreadcrumbs(path: string, name: string,  order: number = -1) {
    this.breadcrumbsService.addBreadcrumb(path, name, order);
  }
}
