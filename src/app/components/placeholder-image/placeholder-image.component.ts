import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-placeholder-image',
  imports: [],
  templateUrl: './placeholder-image.component.html',
  styleUrl: './placeholder-image.component.css'
})
export class PlaceholderImageComponent {
  @Input('src') src: string|null = '';
  @Input ('alt') alt: string|null = '';
  @Input ('style') style: string|null = '';
  constructor() {
    if (this.src?.indexOf('http') === -1) {
      this.src = 'placeholder.jpg';
    }
  }
  onError() {
    console.log('error');
    this.src = 'placeholder.jpg';
  }
}
