export class Breadcrumb {
    order: number;
    name: string;
    path: string;

    constructor(order: number, name: string, path: string) {
    this.order = order;
    this.name = name;
    this.path = path;
    }
}