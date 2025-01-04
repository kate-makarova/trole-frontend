import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {APIService} from "../apiservice/apiservice.service";
import {Breadcrumb} from "../../entities/Breadcrumb";

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService extends APIService {
  private breadcrumbs = new BehaviorSubject<Breadcrumb[]>(
    []
  );
  breadcrumbs$ = this.breadcrumbs.asObservable();

  setBreadcrumbs (data: Breadcrumb[]) {
    this.breadcrumbs.next(data);
  }

  clearBreadcrumbs() {
    this.breadcrumbs.next([])
  }

  changeBreadcrumbs(path: string, parameters: any[]) {
    this.getData<Breadcrumb[]>('breadcrumbs/'+path, parameters).subscribe(data => {
      this.breadcrumbs.next(data);
    })
  }
}
