// Importables
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';

// Components
import { DFormElement } from './dform.element';

// Directive
export class DFormAbstractComponent implements OnInit {

  public static metaData = { // this should be refactored
    inputs: ['element', 'form']
  };

  @Input() public element: DFormElement<string>;
  @Input() public form: FormGroup;

  public ngOnInit() {
    console.log(this.form, this.element);
    this.form.controls[this.element.key].setValue([{
      test: true,
    }]);
    console.log(this.form.value);
  }
};
