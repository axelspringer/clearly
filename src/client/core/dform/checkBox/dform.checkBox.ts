// Importables
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Components
import { DFormElement } from '../dform.element';

export class DFormCheckBox extends DFormElement<string> {

  public controlType = 'checkBox';
  public type: string;
  public isChecked: boolean;
  public checkboxLabel = 'Label of this checkbox';


  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.isChecked = false;
    // TODO: Sollen checkboxLabel und isChecked aus db/mocks kommen oder intern verwaltet werden?
  }

};

@Component({
  selector: 'sg-dform-checkbox',
  templateUrl: './dform.checkBox.html',
  styleUrls: [
    './dform.checkBox.scss',
  ],
})
export class DFormCheckBoxComponent {

  @Input() public element: DFormElement<string>;
  @Input() public form: FormGroup;

};