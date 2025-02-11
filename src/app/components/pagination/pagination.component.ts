import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-pagination',
  imports: [
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 10;
  @Input() totalItems: number = 10;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  pagesToRender: [{name: string, page: number|null}]

  constructor() {
    this.pagesToRender = [{name: '1', page: 1}]
  }

  ngOnChanges() {
    if (this.currentPage == -1) {
      this.currentPage = this.totalPages;
    }

    this.pagesToRender = [{name: '1', page: 1}]
    if (this.currentPage > 3) {
      this.pagesToRender.push({name: '...', page: null})
    }
    if (this.currentPage > 2) {
      this.pagesToRender.push({name: (this.currentPage - 1).toString(), page: this.currentPage - 1})
    }
    if(this.currentPage > 1) {
      this.pagesToRender.push({name: this.currentPage.toString(), page: this.currentPage})
    }

    if(this.totalPages - this.currentPage > 1) {
      this.pagesToRender.push({name: (this.currentPage + 1).toString(), page: this.currentPage + 1})
    }
    if (this.totalPages - this.currentPage > 2) {
      this.pagesToRender.push({name: '...', page: null})
    }
    if(this.totalPages > this.currentPage) {
      this.pagesToRender.push({name: this.totalPages.toString(), page: this.totalPages})
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChanged.emit(page);
    }
  }
}
