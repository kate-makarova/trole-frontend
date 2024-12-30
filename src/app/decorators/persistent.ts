import {Observable} from "rxjs";

export function Persistent() {
    return function (target: any, key: string) {
        Object.defineProperty(target, key, {
            get: function () {
                return JSON.parse(localStorage.getItem(target.constructor.name + '.' + key) ?? '')
            },
            set: function (newValue) {
                localStorage.setItem(target.constructor.name + '.' + key, JSON.stringify(newValue));
                return newValue;
            },
            enumerable: true,
            configurable: true
        });
    };
}
