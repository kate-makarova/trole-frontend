import { Injectable } from '@angular/core';
import {Article} from "../../entities/Article";
import {EntityService} from '../EntityService';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends EntityService<Article> {

  protected override endpoints = {
    "loadList": "article-list/",
    "load": "article/",
    "create": "article-create",
    "update": "article-edit/"
  }

  loadByGameAndId(gameId: number, id: number): void {
    this.getData<Article>('article-index/'+gameId+'/'+id).subscribe((data: Article) => {
      this.entitySubject.next(data);
    })
  }

  loadIndex(gameId: number): void {
    this.getData<Article>('article-index/'+gameId).subscribe((data: Article) => {
      this.entitySubject.next(data);
    })
  }
}
