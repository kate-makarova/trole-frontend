import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {
  private breadcrumbs = new BehaviorSubject<{path: string, name: string}[]>(
    [{
      path: '/',
      name: 'Home'
    }]
  );
  breadcrumbs$ = this.breadcrumbs.asObservable();

  addBreadcrumb(path: string, name: string, order: number = -1) {
    let newBreadcrumbs = [];
    if (order > -1) {
      newBreadcrumbs = [...this.breadcrumbs.value.slice(0, order-1), {
        name: name,
        path: path
      }]
    } else {
      newBreadcrumbs = [...this.breadcrumbs.value, {
        name: name,
        path: path
      }]
    }
    this.breadcrumbs.next(newBreadcrumbs);
  }

  getItem(index: number) {
    return this.breadcrumbs.value[index];
  }
}
