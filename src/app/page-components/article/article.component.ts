import {Component, OnInit} from '@angular/core';
import {Article} from "../../entities/Article";
import {Observable} from "rxjs";
import {APIService} from "../../services/apiservice/apiservice.service";
import {EntityServiceInterface} from "../../services/entityServiceInterface";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../../services/session/session.service";
import {Router} from "@angular/router";
import {ArticleService} from "../../services/article/article.service";

@Component({
  selector: 'app-article',
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit {
  article: Observable<Article>;

  constructor(
    private articleService: ArticleService,
    private router: Router) {
  }

  ngOnInit() {
    this.articleService.
  }


}
