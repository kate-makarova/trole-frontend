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
        "id": 2,
        "name": "Drafts and Autosave",
        "image": "https://designerapp.officeapps.live.com/designerapp/document.ashx?path=/19aac361-5126-4966-a199-d3c9c8470505/DallEGeneratedImages/dalle-5eb80919-462a-4459-a2e6-9cc993aab0fb0251662991205154125300.jpg&dcHint=WestUS2&fileToken=88fc0e5a-8103-4ed3-b6e6-a27abdbf2aba",
        "content": "<p>Now, when you are writing a post, it will automatically save as a draft every minute. Additionally," +
            "you can save the draft manually at any moment. For the autogenerated drafts, only the last five versions are kept," +
            "and everything older than five minutes is discarded. For the manually saved drafts, you may have as many as you want. " +
            "However, drafts are retained for thirty days only and then deleted.</p>" +
            "<p>Drafts are nore designed to be a permanent storage for your posts!</p>",
        "date": "2025-02-11"
      },
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
