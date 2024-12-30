import {Component, OnInit} from '@angular/core';
import {Article} from "../../entities/Article";
import {Observable, of, share, shareReplay} from "rxjs";
import {APIService} from "../../services/apiservice/apiservice.service";
import {EntityServiceInterface} from "../../services/entityServiceInterface";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../../services/session/session.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../../services/article/article.service";
import {AsyncPipe, NgIf} from '@angular/common';

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
    private router: Router,
    private route: ActivatedRoute) {
    this.gameId = Number(this.route.snapshot.paramMap.get('game_id'));
  }

  ngOnInit() {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.articleId = parseInt(articleId);
    }
    if (this.articleId) {
      this.article$ = this.articleService.getByGameAndId(this.gameId, this.articleId).pipe(shareReplay(1))
    } else {
      this.article$ = this.articleService.getIndex(this.gameId).pipe(shareReplay(1))
    }
  }


  protected readonly Article = Article;
}
