// Importables
import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { Input } from '@angular/core';
import { Inject } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { forwardRef } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { EventEmitter } from '@angular/core';

// Components
import { DFormComponentFocus } from './dform.component';
import { DFormComponent } from './dform.component';
import { DFormElement } from './dform.element';
import { EventEmitProvider } from '../events';
import { KEY_CODES } from './index';

@Directive({
  selector: '[dFormElementEvents]',
})
export class DFormElementEventsDirective implements AfterViewInit, OnDestroy {

  @Input('dFormElementEvents') public element: DFormElement<any>;

  private __emitRef: EventEmitter<any>;

  constructor(
    private __elRef: ElementRef,
    @Inject(forwardRef(() => DFormComponent)) private __parentComponent,
  ) { }

  // events

  // @HostListener('keydown', ['$event'])
  // public onKeyUp(event: KeyboardEvent) {
  //   if (event.keyCode === KEY_CODES.BACKSPACE
  //     && this.__elRef.nativeElement.value === '') { // this is doll
  //     event.preventDefault();
  //     this.__dForm.removeFormElement(this.element);
  //   }
  // };

  @HostListener('keypress', ['$event'])
  public onKeyPress(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODES.ENTER
      && !event.shiftKey) {
      event.preventDefault();
      this.__parentComponent.addFormElement(this.element);
    }
  };

  @HostListener('focus')
  public onFocus() {
    EventEmitProvider
      .connect(DFormComponentFocus.prototype.constructor.name)
      .emit(this.element.key);
  }

  // public

  public ngAfterViewInit() {
    this.__emitRef = EventEmitProvider
      .connect(DFormComponentFocus.prototype.constructor.name)
      .subscribe(value => {
        if (value === this.element.key) {
          this.__elRef.nativeElement.focus();
        }
      });
  }

  public ngOnDestroy(): void {
    if (this.__emitRef) {
      this.__emitRef.unsubscribe();
    }
  }

}
