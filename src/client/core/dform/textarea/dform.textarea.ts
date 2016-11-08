// Importables
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Inject } from '@angular/core';
import { forwardRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HostListener } from '@angular/core';
import { ViewChildren } from '@angular/core';

// Components
import { DFormElement } from '../dform.element';
import { DForm } from '../dform.service';
import { EventEmitProvider } from '../../events';
import { DFormComponentFocus } from '../dform.component';

enum Keys {
  Backspace = 8,
  Enter = 13,
}

export class DFormTextArea extends DFormElement<string> {

  public controlType = 'textArea';
  public type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }

};

@Component({
  selector: 'sg-dform-textarea',
  templateUrl: './dform.textarea.html',
  styleUrls: ['./dform.textarea.scss'],
})
export class DFormTextAreaComponent implements OnInit, OnDestroy {

  @Input() public element: DFormElement<string>;
  @Input() public form: FormGroup;

  @ViewChildren('input') public inputs: any; // query list for children in view

  private __emitRef;

  constructor(
    // private __viewContainerRef: ViewContainerRef,
    // private __elRef: ElementRef,
    @Inject(forwardRef(() => DForm)) private __DForm: DForm,
  ) {}

  @HostListener('keydown', ['$event'])
  public onKeyUp(event: KeyboardEvent) {
    if (event.keyCode === Keys.Backspace
      && this.inputs.length === 1 // be secure at this state
      && this.inputs.first.nativeElement.value === '') {
        event.preventDefault();
        this.__DForm.removeFormElement(this.element);
    }
  };

  @HostListener('keypress', ['$event'])
  public onKeyPress(event: KeyboardEvent) {
    if (event.keyCode === Keys.Enter
      && !event.shiftKey) {
      event.preventDefault();
      this.__DForm.addFormElement(this.element);
    }
  };

  public ngOnInit(): void {
    this.__emitRef = EventEmitProvider
      .connect(DFormComponentFocus.prototype.constructor.name)
      .subscribe(value => {
        if (value === this.element.key) {
          this.inputs.first.nativeElement.focus();
        }
    });
  }

  public ngOnDestroy(): void {
    if (this.__emitRef) {
      this.__emitRef.unsubscribe();
    }
  }

};
