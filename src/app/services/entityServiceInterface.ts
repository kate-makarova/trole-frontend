import {Observable} from "rxjs";

export interface EntityServiceInterface {
    get(id: number): Observable<any>;
    getList(param: number, page: number): Observable<any[]>;
    create(formData: FormData): Observable<number>;
    update(id: number, formData: FormData): Observable<number>;
}