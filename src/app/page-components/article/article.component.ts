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
import {SessionService} from '../../services/session/session.service';
import {Game} from '../../entities/Game';

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
  article$: Observable<Article|null> = of();
  articleId: number|null = null;
  gameId: number;
  topButtons: TopButton[] = []

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbsService,
    private titleService: Title,
    private sessionService: SessionService
    ) {
    this.gameId = Number(this.route.snapshot.paramMap.get('game_id'));
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.articleId = parseInt(articleId);
    }
  }

  setTopButtons(articleId:number|null = null) {
    if (this.sessionService.getUser() == null) {
      return;
    }

    this.topButtons = [
      {
        path: '/article-create/'+this.gameId,
        name: 'Add Article',
        class: 'button success',
        id: 'top-button-create-article',
        click: null
      }
    ]

    if(articleId) {
      this.topButtons.push(  {
        path: '/article-edit/'+this.gameId+'/'+articleId,
        name: 'Edit Article',
        class: 'button primary',
        id: 'top-button-edit-article',
        click: null
      })
    } else {
      this.topButtons.push(  {
        path: '/article-edit/'+this.gameId+'/'+this.articleId,
        name: 'Edit Article',
        class: 'button primary',
        id: 'top-button-edit-article',
        click: null
      })
    }
  }

  ngOnInit() {
    if (this.articleId) {
      this.titleService.setTitle('Articles');
      this.breadcrumbService.changeBreadcrumbs('article', [this.gameId, this.articleId])
      this.articleService.loadByGameAndId(this.gameId, this.articleId)
      this.setTopButtons()
      this.article$ = this.articleService.get().pipe(shareReplay(1))
    } else {
      this.articleService.loadIndex(this.gameId)
      this.article$ = this.articleService.get().pipe(shareReplay(1))
      this.article$.subscribe(article => {
        if(article == null){return}
        this.titleService.setTitle(article.name)
        this.breadcrumbService.changeBreadcrumbs('article', [this.gameId])
        this.setTopButtons(article.id)
      })
    }
  }
}
