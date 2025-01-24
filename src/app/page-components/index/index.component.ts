import {Component, OnInit} from '@angular/core';
import {NewsArticle} from "../../entities/NewsArticle";
import {AsyncPipe, NgForOf, SlicePipe} from "@angular/common";
import {Observable, of, shareReplay} from "rxjs";
import {NewsArticleService} from "../../services/newsarticle/newsarticle.service";
import {BreadcrumbsService} from '../../services/breadcrubs/breadcrumbs.service';
import { TranslateModule } from '@ngx-translate/core';
import {SceditorComponent} from "../../sceditor/sceditor/sceditor.component";

@Component({
  selector: 'app-index',
  imports: [
    SlicePipe,
    NgForOf,
    AsyncPipe,
    TranslateModule,
    SceditorComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  newsArticles$: Observable<NewsArticle[]> = of([])

  constructor(private newsArticleService: NewsArticleService,
              private breadcrumbsService: BreadcrumbsService) {
  }

  ngOnInit() {
    this.breadcrumbsService.clearBreadcrumbs()
    this.newsArticles$ = this.newsArticleService.getLatestArticles(5).pipe(shareReplay(1));
  }
}
