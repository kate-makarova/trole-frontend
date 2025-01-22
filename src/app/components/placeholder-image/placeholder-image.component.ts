import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-placeholder-image',
  imports: [],
  templateUrl: './placeholder-image.component.html',
  styleUrl: './placeholder-image.component.css'
})
export class PlaceholderImageComponent implements OnInit {
  @Input('src') src: string|null = '';
  @Input ('alt') alt: string|null = '';
  @Input ('style') style: string|null = '';
  constructor() {
  }

  ngOnInit() {
    if (this.src === null || this.src.indexOf('http') === -1) {
      this.src = 'placeholder.jpg';
    }
  }

  onError() {
    this.src = 'placeholder.jpg';
  }
}
