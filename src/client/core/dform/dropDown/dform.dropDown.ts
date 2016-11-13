// Importables
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Components
import { DFormElement } from '../dform.element';

export class DFormDropDown extends DFormElement<string> {

  public controlType = 'dropDown';
  public type: string;
  public dLabel = 'Label of this dropdown';

  public dOptions = [
    { value: 'opt1', display: 'Option 1' },
    { value: 'opt2', display: 'Option 2' },
    { value: 'opt3', display: 'Option 3' }
  ];

  public selectedValue = this.dOptions[1].value; //default

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }

};

@Component({
  selector: 'sg-dform-dropdown',
  templateUrl: './dform.dropDown.html',
  styleUrls: [
    './dform.dropDown.scss',
  ],
})
export class DFormDropDownComponent {

  @Input() public element: DFormElement<string>;
  @Input() public form: FormGroup;

};
