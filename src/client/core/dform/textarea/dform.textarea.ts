// Importables
import { AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { forwardRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { Inject } from '@angular/core';
import { Input } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ViewChildren } from '@angular/core';
import { QueryList } from '@angular/core';

// Components
import { DFormElement } from '../dform.element';
import { DForm } from '../dform.service';
import { EventEmitProvider } from '../../events';
import { DFormComponentFocus } from '../dform.component';

export enum Keys {
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
export class DFormTextAreaComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() public element: DFormElement<string>;
  @Input() public form: FormGroup;

  @ViewChildren('input') private __inputs: QueryList<any>; // query list for children in view
  @ViewChildren('quickBar') private __quickBar: QueryList<any>;

  @HostListener('keydown', ['$event'])
  public onKeyUp(event: KeyboardEvent):void {
    if (event.keyCode === Keys.Backspace
      && this.__inputs.length === 1 // be secure at this state
      && this.__inputs.first.nativeElement.value === '') {
      event.preventDefault();
      this.__DForm.removeFormElement(this.element);
    }
  };

  @HostListener('keypress', ['$event'])
  public onKeyPress(event: KeyboardEvent):void {
    if (event.keyCode === Keys.Enter
      && !event.shiftKey) {
      event.preventDefault();
      this.__DForm.addFormElement(this.element);
    }
  };

  private __emitRef: EventEmitter<any>;

  constructor(
    @Inject(forwardRef(() => DForm)) private __DForm: DForm,
  ) { }

  // public

  public ngAfterViewInit() {
    const ref = this.__inputs.first.nativeElement.addEventListener('focus', () => {
      EventEmitProvider
        .connect(DFormComponentFocus.prototype.constructor.name)
        .emit(this.element.key);
    });
    console.log(ref);
  }

  public ngOnInit(): void {
    this.__emitRef = EventEmitProvider
      .connect(DFormComponentFocus.prototype.constructor.name)
      .subscribe(value => {
        if (value === this.element.key) {
          this.__inputs.first.nativeElement.focus();
          this.__quickBar.first.show();
        } else {
          this.__quickBar.first.hide();
        }
      });
  }

  public ngOnDestroy(): void {
    if (this.__emitRef) {
      this.__emitRef.unsubscribe();
    }
  }

  // private

};
