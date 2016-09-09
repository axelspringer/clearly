import {
  Directive,
  EventEmitter,
  HostListener,
  ElementRef,
  OnInit,
  Renderer
} from '@angular/core';

@Directive({
  selector: '[dragabble]'
})
export class Dragabble implements OnInit {

  mouseDrag;
  mouseUp = new EventEmitter();
  mouseDown = new EventEmitter();
  mouseMove = new EventEmitter();

  @HostListener('mouseup', ['$event'])
  onMouseup(event) {
    this.mouseUp.next(event);
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    this.mouseDown.next(event);
  }

  @HostListener('mousemove', ['$event'])
  onMousemove(event) { this.mouseMove.next(event); }

  constructor(
    public element: ElementRef
  ) {

    this.element.nativeElement.style.position = 'relative';
    this.element.nativeElement.style.cursor = 'pointer';

    this.mouseDrag = this.mouseDown.map(event => {
      event.preventDefault();
      return {
        left: event.clientX - this.element.nativeElement.getBoundingClientRect().left,
        top: event.clientY - this.element.nativeElement.getBoundingClientRect().top
      };
    })
      .flatMap(imageOffset => this.mouseMove.toRx().map(pos => ({
        top: pos.clientY - imageOffset.top,
        left: pos.clientX - imageOffset.left
      }))
        .takeUntil(this.mouseUp.toRx()));

  }

  ngOnInit() {
    this.mouseDrag.subscribe({
      next: pos => {
        // Update position
        this.element.nativeElement.style.top  = pos.top  + 'px';
        this.element.nativeElement.style.left = pos.left + 'px';
      }
    });
  }

};
