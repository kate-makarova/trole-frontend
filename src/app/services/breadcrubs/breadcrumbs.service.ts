import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Persistent} from "../../decorators/persistent";
import {APIService} from "../apiservice/apiservice.service";
import {Breadcrumb} from "../../entities/Breadcrumb";

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService extends APIService {
  @Persistent()
  private breadcrumbs = new BehaviorSubject<Breadcrumb[]>(
    [{
      path: '/',
      name: 'Home'
    }]
  );
  breadcrumbs$ = this.breadcrumbs.asObservable();

  getItem(index: number) {
    return this.breadcrumbs.value[index];
  }

  setBreadcrumbs (data: Breadcrumb[]) {
    this.breadcrumbs.next(data);
  }

  changeBreadcrumbs(path: string, parameters: any[]) {
    this.getData<Breadcrumb[]>('breadcrumbs/'+path, parameters).subscribe(data => {
      this.breadcrumbs.next(data);
    })
  }
}
