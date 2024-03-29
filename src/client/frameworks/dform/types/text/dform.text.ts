/* tslint:disable max-classes-per-file */
// Importables
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Components
import { DFormElement } from '../../dform.element';
import { IDFormElementOptions } from '../../dform.element';

export class DFormText extends DFormElement<string> {

  public controlType = 'text';
  public type: string;

  constructor(options: {} = {}) {
    super(<IDFormElementOptions<string>> options);
    this.type = options['type'] || '';
  }

};

@Component({
  selector: 'sg-dform-text',
  templateUrl: './dform.text.html',
  styleUrls: ['./dform.text.scss'],
})
export class DFormTextComponent {

  @Input() public element: DFormElement<string>;
  @Input() public form: FormGroup;

};
