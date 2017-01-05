// Importables
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

// Components
import { DFormElement } from './dform.element';

@Component({
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './dform.element.component.scss' ],
  selector: 'sg-dform-element',
  templateUrl: './dform.element.component.html',
})
export class DFormDynamicElementComponent {

  @Input() public element: DFormElement<any>;
  @Input() public form: FormGroup;

  get isValid() {
    return this.form.controls[this.element.key].valid;
  }

};
