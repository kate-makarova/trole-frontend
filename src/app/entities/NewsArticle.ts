export class NewsArticle {
    id: number;
    name: string;
    content: string;
    image: string;
    date: string;

    constructor(id: number, name: string, content: string, image: string, date: string) {
        this.id = id;
        this.name = name;
        this.content = content;
        this.image = image;
        this.date = date;
    }
}