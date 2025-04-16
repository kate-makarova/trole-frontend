import {
  AfterViewInit, ChangeDetectorRef,
  Component, ElementRef, Injector,
  Input, OnDestroy, OnInit, Type,
} from '@angular/core';
import {NgComponentOutlet, NgIf} from "@angular/common";

@Component({
  selector: 'app-tooltip',
  imports: [
    NgComponentOutlet,
    NgIf
  ],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css'
})
export class TooltipComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() target!: HTMLElement;
  @Input('content') content: string = '';
  @Input() contentComponent!: any; // Component class
  @Input() componentInputs: Record<string, any> = {};
  visible: string = 'hidden';
  top: number = 0;
  left: number = 0;
  ready: boolean = false;

  constructor(private elRef: ElementRef, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.ready = true;
  }

  ngAfterViewInit() {
    this.cdr.detectChanges(); // 👈 This forces Angular to update the view
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
    this.cdr.detectChanges();
  };

  onMouseLeave = () => {
   this.visible = 'hidden';
    this.cdr.detectChanges();
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
