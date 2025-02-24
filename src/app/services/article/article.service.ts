import { Injectable } from '@angular/core';
import {Article} from "../../entities/Article";
import {EntityService} from "../entity/entity.service";

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends EntityService<Article> {

  protected override endpoints = {
    "loadList": "article-list/",
    "load": "article/",
    "create": "article-create",
    "update": "article-update/",
    "delete": ""
  }

  loadByGameAndId(gameId: number, id: number): void {
    this.getData<Article>('article/'+gameId+'/'+id).subscribe((data: Article) => {
      this.entitySubject.next(data);
    })
  }

  loadIndex(gameId: number): void {
    this.getData<Article>('article-index/'+gameId).subscribe((data: Article) => {
      this.entitySubject.next(data);
    })
  }
}
