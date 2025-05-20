import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbsService} from '../../services/breadcrubs/breadcrumbs.service';
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Breadcrumb} from '../../entities/Breadcrumb';
import {Subscription} from 'rxjs';

class Breadcrumbs {
}

@Component({
  selector: 'app-breadcrumbs',
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  breadcrumbs: Breadcrumb[] = []
  private subscription: Subscription | null = null;

  constructor(private breadcrumbsService: BreadcrumbsService) {
  }

  ngOnInit() {
    this.subscription = this.breadcrumbsService.breadcrumbs$.subscribe(breadcrumbs => this.breadcrumbs = breadcrumbs);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
