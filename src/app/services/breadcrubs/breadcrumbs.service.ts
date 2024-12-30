import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Persistent} from "../../decorators/persistent";

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {
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
}
