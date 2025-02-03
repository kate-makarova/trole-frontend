import {Component, OnInit} from '@angular/core';
import {Observable, of, shareReplay} from "rxjs";
import {Page} from "../../entities/Page";
import {AsyncPipe, NgIf} from "@angular/common";
import {PageService} from "../../services/page/page.service";
import {ActivatedRoute} from "@angular/router";
import {BreadcrumbsService} from "../../services/breadcrubs/breadcrumbs.service";

@Component({
  selector: 'app-page',
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent implements OnInit {
  protected page$: Observable<Page | null> = of(null);
  private path: string|null = null;
  private category: string|null = null;

  constructor(private pageService: PageService,
              private route: ActivatedRoute,
              private breadcrumbsService: BreadcrumbsService) {
  }

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('category');
    this.path = this.route.snapshot.paramMap.get('path');
    let path = '404'
    if(this.path !== null) {
      path = this.path
      if (this.category !== null) {
        path = this.category + '/' + path;
      }
    }
    this.pageService.loadPageByPath(path)
    this.page$ = this.pageService.get().pipe(shareReplay(1));
    this.page$.subscribe(page => {
      if(page == null){return}
      this.breadcrumbsService.changeBreadcrumbs('page', [this.category, this.path])
    });
  }
}
