import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Persistent} from "../../decorators/persistent";
import {Game} from "../../entities/Game";
import {Episode} from "../../entities/Episode";
import {Article} from "../../entities/Article";
import {APIService} from "../apiservice/apiservice.service";
import {Breadcrumb} from "../../entities/Breadcrumb";

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService extends APIService {
  @Persistent()
  private breadcrumbs = new BehaviorSubject<{path: string, name: string, order: number}[]>(
    [{
      path: '/',
      name: 'Home',
      order: 0
    }]
  );
  breadcrumbs$ = this.breadcrumbs.asObservable();

  addBreadcrumb(path: string, name: string, order: number = -1) {
    let newBreadcrumbs = [];
    if (order > -1) {
      newBreadcrumbs = [...this.breadcrumbs.value.slice(0, order), {
        name: name,
        path: path,
        order: order
      }]
    } else {
      newBreadcrumbs = [...this.breadcrumbs.value, {
        name: name,
        path: path,
        order: order
      }]
    }
    this.breadcrumbs.next(newBreadcrumbs);
  }

  getItem(index: number) {
    return this.breadcrumbs.value[index];
  }

  setBreadcrumbs (data: {path: string, name: string, order: number}[]) {
    this.breadcrumbs.next(data);
  }

  changeBreadcrumbs(path: string, parameters: any[]) {
    this.getData<Breadcrumb[]>('breadcrumbs/'+path, parameters).subscribe(data => {
      this.breadcrumbs.next(data);
    })
  }
}
