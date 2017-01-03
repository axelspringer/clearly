/* tslint:disable max-classes-per-file */
// Importables
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';

// Components
import { DFormElement } from '../../dform.element';
import { IDFormElementOptions } from '../../dform.element';

export class DFormTextArea extends DFormElement<string> {

  public controlType = 'textArea';
  public type: string;

  constructor(options: {} = {}) {
    super(<IDFormElementOptions<string>> options);
    this.type = options['type'] || '';
  }

};

@Component({
  selector: 'sg-dform-textarea',
  templateUrl: './dform.textArea.html',
  styleUrls: ['./dform.textArea.scss'],
})

export class DFormTextAreaComponent {

  @Input() public element: DFormElement<string>;
  @Input() public form: FormGroup;

};
