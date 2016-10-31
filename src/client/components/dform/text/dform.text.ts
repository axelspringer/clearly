// Importables
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Components
import { DFormElement } from '../dform.element';

export class DFormText extends DFormElement<string> {

  public controlType = 'text';
  public type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }

};

@Component({
  selector: 'my-dform-text',
  templateUrl: './dform.text.html',
  styleUrls: [
    './dform.text.scss',
  ],
})
export class DFormTextComponent {

  @Input() public element: DFormElement<string>;
  @Input() public form: FormGroup;

};
