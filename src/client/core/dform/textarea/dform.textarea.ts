// Importables
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Inject } from '@angular/core';
import { forwardRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HostListener } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ViewChildren } from '@angular/core';

// Components
import { DFormElement } from '../dform.element';
import { DForm } from '../dform.service';
// import { ConsoleLogEmitter } from '../../log/log.service';

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
export class DFormTextAreaComponent {

  @Input() public element: DFormElement<string>;
  @Input() public form: FormGroup;

  @ViewChildren('input') public inputs: any; // query list for children in view

  constructor(
    private __viewContainerRef: ViewContainerRef,
    @Inject(forwardRef(() => DForm)) private __DForm: DForm,
  ) {
  }

  @HostListener('keyup', ['$event'])
  public onKeyUp(event: KeyboardEvent) {
    if (event.keyCode === Keys.Backspace
      && this.inputs.length === 1 // be secure at this state
      && this.inputs.first.nativeElement.value === '') {
        // cancel event
        event.preventDefault();
        // send to dform service
        this.__DForm.removeFormElement(this.element);
    }
  };

  @HostListener('keypress', ['$event'])
  public onKeyPress(event: KeyboardEvent) {
    if (event.keyCode === Keys.Enter) {
        // cancel event
        event.preventDefault();
        // send to dform service
        this.__DForm.addFormElement();
    }
  };


};
