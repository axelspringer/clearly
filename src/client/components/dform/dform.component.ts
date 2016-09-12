// Importables
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  DoCheck,
  AfterViewChecked
} from '@angular/core';
import { FormGroup } from '@angular/forms';

// Components
import { DFormService } from './dform.service';

// test
import { DFormTextbox } from './dform.textbox';

@Component({
  selector: 'dform',
  templateUrl: './dform.component.html',
  providers: [
    DFormService
  ]
})
export class DFormComponent implements OnInit {

  @Input('dform-model') elements: Array<any> = [];

  // this maps the form group
  form: FormGroup;
  payload;

  constructor(
    private dformService: DFormService
  ) {}

  ngOnInit() {
    this.form = this.dformService.toFormGroup(this.elements);
  }

  ngDoCheck() {
    if (this.elements.length !== Object.keys(this.form.controls || {}).length) {
      console.log('Updating...');
      this.form = this.dformService.toFormGroup(this.elements);
    }
  }

  onSubmit() {
    this.payload = JSON.stringify(this.form.value);
  }

};
