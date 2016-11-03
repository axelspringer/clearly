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
import { ConsoleLogEmitter } from '../../log/log.service';

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

  public isQuickEditMode  = true;

  constructor(
    private viewContainerRef: ViewContainerRef,
    @Inject(forwardRef(() => DForm)) public dformService: DForm,
  ) {
  }

  @HostListener('keydown', ['$event'])
  public onPress(event: KeyboardEvent) {
    if (!this.isQuickEditMode) {
      return;
    }
    if (event.keyCode === Keys.Backspace
      && this.inputs.length === 1 // be secure at this state
      && this.inputs.first.nativeElement.value === '') {
        // send to dform service
        this.dformService.remove();
    }
  };


};
