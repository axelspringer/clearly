// Importables
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Components
import { DFormElement } from '../dform.element';

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
  styleUrls: [
    './dform.textarea.scss',
  ],
})
export class DFormTextAreaComponent {

  @Input() public element: DFormElement<string>;
  @Input() public form: FormGroup;

};
