import {Observable, of} from "rxjs";

export class ChatSubscriptionSimple {
    id: number;
    title: string;
    unread$: Observable<number> = of(0);

    constructor(id: number, title: string, unread$: Observable<number>) {
        this.id = id;
        this.title = title;
        this.unread$ = unread$;
    }
}