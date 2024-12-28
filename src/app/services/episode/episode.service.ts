import {Injectable} from '@angular/core';
import {Episode} from '../../entities/Episode';
import {APIService} from '../apiservice/apiservice.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SessionService} from '../session/session.service';
import {Router} from '@angular/router';
import {SimpleEntity} from '../../entities/SimpleEntity';
import {EntityServiceInterface} from "../entityServiceInterface";

@Injectable({
    providedIn: 'root'
})
export class EpisodeService extends APIService implements EntityServiceInterface {

    constructor(http: HttpClient, sessionService: SessionService, router: Router) {
        super(http, sessionService, router);
    }

    getList(gameId: number, page: number): Observable<Episode[]> {
        return this.getData<Episode[]>('episode-list/' + gameId)
    }

    get(id: number): Observable<Episode> {
        return this.getData<Episode>('episode/' + id)
    }

    create(formData: any): Observable<number> {
        return this.postData('episode-create', formData);
    }

    update(id: number, formData: any): Observable<number> {
        return this.postData('episode-edit/' + id, formData);
    }
}
