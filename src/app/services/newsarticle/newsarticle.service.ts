import { Injectable } from '@angular/core';
import {APIService} from "../apiservice/apiservice.service";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../session/session.service";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {NewsArticle} from "../../entities/NewsArticle";

@Injectable({
  providedIn: 'root'
})
export class NewsArticleService extends APIService {

  constructor(http: HttpClient, sessionService: SessionService, router: Router) {
    super(http, sessionService, router);
  }

  getLatestArticles(limit: number): Observable<NewsArticle[]> {
   // return this.getData<NewsArticle[]>('news-articles/latest/'+limit)
    return of([
      {
        "id": 1,
        "name": "Core Functionality Is Ready",
        "image": "https://windybot.com/img/1K8zmgvb7B7eQOku8yXx.jpg",
        "content": "<p>The core sight functionality is ready. We can create games, characters and episodes. There are some basic\n" +
            "                bb codes we can use in the posts. Only the limited amount of genres and fandoms have been added to the database at this point. You can\n" +
            "            request more, and I will gladly add them.There is the visibility setting in the game menu, but it does not affect anything at this point. All the\n" +
            "            games, for now, are visible to the registered users and only to the registered users.</p>\n" +
            "            <p>There is no registration at this point, and it will not be opened for the time being. All the new users\n" +
            "            will be added manually.</p>",
        "date": "2025-01-03"
      }
    ])
  }
}
