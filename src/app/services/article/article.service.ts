import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../session/session.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Article} from "../../entities/Article";
import {APIService} from "../apiservice/apiservice.service";
import {EntityServiceInterface} from "../entityServiceInterface";
import {Game} from "../../entities/Game";
import {Breadcrumb} from "../../entities/Breadcrumb";

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends APIService implements EntityServiceInterface {

  constructor(http: HttpClient, sessionService: SessionService, router: Router) {
    super(http, sessionService, router);
  }

  getList(gameId: number, page: number): Observable<Article[]> {
    return this.getData<Article[]>('article-list/' + gameId)
  }

  get(id: number): Observable<Article> {
    return this.getData<Article>('article/' + id)
  }

  getByGameAndId(gameId: number, id: number): Observable<Article> {
    return this.getData<Article>('article-index/'+gameId+'/'+id)
  }

  getIndex(gameId: number): Observable<Article> {
    return this.getData<Article>('article-index/'+gameId)
  }

  create(formData: any): Observable<number> {
    return this.postData('article-create', formData);
  }

  update(id: number, formData: any): Observable<number> {
    return this.postData('article-edit/' + id, formData);
  }
}
