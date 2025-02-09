import { Injectable } from '@angular/core';
import {APIService} from "../apiservice/apiservice.service";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../session/session.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export abstract class EntityService<T> extends APIService {
  protected entityListSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  public entityList$: Observable<T[]> = this.entityListSubject.asObservable();
  protected entitySubject: BehaviorSubject<T|null> = new BehaviorSubject<T|null>(null);
  public entity$: Observable<T|null> = this.entitySubject.asObservable();

  protected endpoints = {
    "loadList": "",
    "load": "",
    "create": "",
    "update": "",
    "delete": ""
  }

  constructor(http: HttpClient, sessionService: SessionService, router: Router) {
    super(http, sessionService, router);
  }

  loadList(episodeId: number, page: number = 0): void {
    let endpoint = this.endpoints.loadList+episodeId
    if(page != 0) {
      endpoint = this.endpoints.loadList+episodeId + '/' + page
    }
    this.getData<any>(endpoint).subscribe((data: T[]) => {
      this.entityListSubject.next(data);
    })
  }

  getList(): Observable<T[]> {
    return this.entityList$;
  }

  getCurrentList(): T[] {
    return this.entityListSubject.value as T[];
  }

  updateListItem(newItem: T, index: number): void {
    let val = this.entityListSubject.value;
    val.map((v) => {
      // @ts-ignore
      if (v.id == newItem.id) {
        return newItem;
      } else {
        return v;
      }
    })
    this.entityListSubject.next(this.entityListSubject.value);
  }

  load(id: number): void {
    this.getData<any>(this.endpoints.load+id).subscribe((data: T) => {
      this.entitySubject.next(data);
    })
  }

  get(): Observable<T|null> {
    return this.entity$;
  }

  set(data:T|null): void {
    this.entitySubject.next(data)
  }

  create(formData: any): Observable<number> {
    return this.postData(this.endpoints.create, formData);
  }

  update(id: number, formData: any): Observable<T> {
    return this.postData(this.endpoints.update + id, formData);
  }

  delete(id: number): Observable<T> {
    return this.postData(this.endpoints.delete + id, []);
  }
}
