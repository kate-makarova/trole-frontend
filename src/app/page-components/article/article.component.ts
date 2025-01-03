import {Component, OnInit} from '@angular/core';
import {Article} from "../../entities/Article";
import {Observable, of, shareReplay} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../../services/article/article.service";
import {AsyncPipe, NgIf} from '@angular/common';
import {BreadcrumbsService} from "../../services/breadcrubs/breadcrumbs.service";
import {Title} from "@angular/platform-browser";
import {TopButton} from "../../entities/TopButton";
import {TopButtonsComponent} from "../../components/top-buttons/top-buttons.component";

@Component({
  selector: 'app-article',
  imports: [
    AsyncPipe,
    NgIf,
    TopButtonsComponent
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit {
  article$: Observable<Article> = of();
  articleId: number|null = null;
  gameId: number;
  topButtons: TopButton[] = []

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbsService,
    private titleService: Title,
    ) {
    this.gameId = Number(this.route.snapshot.paramMap.get('game_id'));
  }

  ngOnInit() {
    const articleId = this.route.snapshot.paramMap.get('id');
    this.topButtons = [
      {
        path: '/article-create',
        name: 'Add Article',
        class: 'button success',
        id: 'top-button-create-article'
      }
    ]
    if (articleId) {
      this.articleId = parseInt(articleId);
    }
    if (this.articleId) {
      this.titleService.setTitle('Articles');
      this.breadcrumbService.changeBreadcrumbs('article', [this.gameId, this.articleId])
      this.article$ = this.articleService.getByGameAndId(this.gameId, this.articleId).pipe(shareReplay(1))
    } else {
      this.article$ = this.articleService.getIndex(this.gameId).pipe(shareReplay(1))
      this.article$.subscribe(article => {
        this.titleService.setTitle(article.name)
        this.breadcrumbService.changeBreadcrumbs('article', [this.gameId])
      })
    }
  }
}
