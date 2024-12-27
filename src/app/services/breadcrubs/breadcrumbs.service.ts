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

  addBreadcrumb(path: string, name: string) {
    const newBreadcrumbs = [...this.breadcrumbs.value, {
      name: name,
      path: path
    }]
    this.breadcrumbs.next(newBreadcrumbs);
  }
}
