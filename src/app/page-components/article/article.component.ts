import {Component, OnInit} from '@angular/core';
import {Article} from "../../entities/Article";
import {Observable, of, share, shareReplay} from "rxjs";
import {APIService} from "../../services/apiservice/apiservice.service";
import {EntityServiceInterface} from "../../services/entityServiceInterface";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../../services/session/session.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../../services/article/article.service";
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-article',
  imports: [
    AsyncPipe
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit {
  article$: Observable<Article> = of();
  articleId: number|null = null;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.articleId = parseInt(articleId);
    }
    if (this.articleId) {
      this.article$ = this.articleService.get(this.articleId).pipe(shareReplay(1))
    } else {
      this.article$ = this.articleService.getIndex().pipe(shareReplay(1))
    }
  }


}
