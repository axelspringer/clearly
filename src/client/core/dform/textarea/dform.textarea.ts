// Importables
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Inject } from '@angular/core';
import { forwardRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HostListener } from '@angular/core';
import { ViewChildren } from '@angular/core';
import { QueryList } from '@angular/core';

// Components
import { DForm } from '../dform.service';
import { DFormComponentFocus } from '../dform.component';
import { DFormElement } from '../dform.element';
import { EventEmitProvider } from '../../events';
import KEY_CODES from '../key.codes';

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

  @ViewChildren('input') public inputs: QueryList<any>; // query list for children in view
  @ViewChildren('quickBar') public quickBar: QueryList<any>;

  private __emitRef;

  constructor(
    @Inject(forwardRef(() => DForm)) private __DForm: DForm,
  ) { }

  @HostListener('keydown', ['$event'])
  public onKeyUp(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODES.BACKSPACE
      && this.inputs.length === 1 // be secure at this state
      && this.inputs.first.nativeElement.value === '') {
      event.preventDefault();
      this.__DForm.removeFormElement(this.element);
    }
  };

  @HostListener('keypress', ['$event'])
  public onKeyPress(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODES.ENTER
      && !event.shiftKey) {
      event.preventDefault();
      this.__DForm.addFormElement(this.element);
    }
  };

  public ngAfterViewInit() {
    this.inputs.first.nativeElement.addEventListener('focus', () => {
      EventEmitProvider
        .connect(DFormComponentFocus.prototype.constructor.name)
        .emit(this.element.key);
    });
  }

  public ngOnInit(): void {
    this.__emitRef = EventEmitProvider
      .connect(DFormComponentFocus.prototype.constructor.name)
      .subscribe(value => {
        if (value === this.element.key) {
          this.inputs.first.nativeElement.focus();
          this.quickBar.first.show();
        } else {
          this.quickBar.first.hide();
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
