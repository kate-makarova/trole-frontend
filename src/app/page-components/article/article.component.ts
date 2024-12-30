import {Component, OnInit} from '@angular/core';
import {Article} from "../../entities/Article";
import {Observable, of, shareReplay} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../../services/article/article.service";
import {AsyncPipe, NgIf} from '@angular/common';
import {BreadcrumbsService} from "../../services/breadcrubs/breadcrumbs.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-article',
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit {
  article$: Observable<Article> = of();
  articleId: number|null = null;
  gameId: number;

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
    if (articleId) {
      this.articleId = parseInt(articleId);
    }
    if (this.articleId) {
      this.titleService.setTitle('Articles');
      this.article$ = this.articleService.getByGameAndId(this.gameId, this.articleId).pipe(shareReplay(1))
    } else {
      this.article$ = this.articleService.getIndex(this.gameId).pipe(shareReplay(1))
      this.article$.subscribe(article => {
        this.titleService.setTitle(article.name)
        this.breadcrumbService.changeLastItem(article.name)
      })
    }
  }
}
