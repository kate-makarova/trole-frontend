import {
  AfterViewInit,
  Component, ElementRef,
  Input, OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-tooltip',
  imports: [
  ],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css'
})
export class TooltipComponent implements AfterViewInit, OnDestroy {
  @Input() target!: HTMLElement;
  @Input('content') content: string = '';
  visible: string = 'hidden';
  top: number = 0;
  left: number = 0;

  constructor(private elRef: ElementRef) {
  }
  ngAfterViewInit() {
    this.target.addEventListener('mouseenter', this.onMouseEnter);
    this.target.addEventListener('mouseleave', this.onMouseLeave);
  }

  ngOnDestroy() {
    this.target.removeEventListener('mouseenter', this.onMouseEnter);
    this.target.removeEventListener('mouseleave', this.onMouseLeave);
  }

  onMouseEnter = () => {
    this.setPosition()
    this.visible = 'visible';
  };

  onMouseLeave = () => {
   this.visible = 'hidden';
  };

  setPosition() {
    const targetRect = this.target.getBoundingClientRect();
    const tooltipElem = this.elRef.nativeElement.querySelector('.tooltip');

    const tooltipRect = tooltipElem.getBoundingClientRect();


    this.top = targetRect.top - tooltipRect.height - 8;
    this.left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;

    // Adjust for scroll
    this.top += window.scrollY;
    this.left += window.scrollX;
  }
}
