import { Injectable } from '@angular/core';
import {EntityService} from "../EntityService";
import {Page} from "../../entities/Page";
import {Article} from "../../entities/Article";

@Injectable({
  providedIn: 'root'
})
export class PageService extends EntityService<Page> {

  protected override endpoints = {
    "loadList": '',
    "load": '',
    "create": "admin-page-create",
    "update": "page-edit/",
  }

  loadPageByPath(path: string) {
    this.getData<Page>('page/'+path).subscribe((data: Page) => {
      this.entitySubject.next(data);
    })
  }

  loadPageTest(path: string) {
    this.entitySubject.next(new Page(1, 'Test', {"id": 1, "name": "test"}, new Date(), "test page", "test page"))
  }
}
