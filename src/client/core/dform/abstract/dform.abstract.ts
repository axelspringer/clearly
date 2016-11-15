// Importables
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Components
import { DFormElement } from '../dform.element';

export class DFormAbstractText extends DFormElement<string> {

  public controlType = 'abstract';
  public type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }

};

@Component({
  selector: 'sg-dform-abstract',
  templateUrl: './dform.abstract.html',
  styleUrls: ['./dform.abstract.scss'],
})
export class DFormAbstractComponent {

  @Input() public element: DFormElement<string>;
  @Input() public form: FormGroup;

};
