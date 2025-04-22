import {Component, Input, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {Observable, of} from "rxjs";

@Component({
    selector: 'app-http-errors',
    imports: [
        NgIf,
        AsyncPipe
    ],
    templateUrl: './http-errors.component.html',
    styleUrl: './http-errors.component.css'
})
export class HttpErrorsComponent implements OnInit {
    @Input('code') code: Observable<number> = of(0);
    message: string = '';
    show: boolean = false;

    ngOnInit() {
        this.code.subscribe((code) => {
            console.log(code)
            if(code !== 0) {
                this.show = true;
            }
            switch (code) {
                case 403:
                    this.message = 'You have no access to this content';
                    break;
                case 404:
                    this.message = 'This page does not exist';
                    break;
                case 500:
                    this.message = 'Internal error. Something is broken on our side';
                    break;
            }
        })
    }
}
