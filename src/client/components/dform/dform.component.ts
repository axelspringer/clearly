// Importables
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  DoCheck,
  AfterViewChecked,
  IterableDiffers,
  CollectionChangeRecord
} from '@angular/core';
import { FormGroup } from '@angular/forms';

// Components
import { DFormService } from './dform.service';

@Component({
  selector: 'dform',
  templateUrl: './dform.component.html',
  providers: [
    DFormService
  ]
})
export class DFormComponent implements OnInit {

  @Input('dform-model') elements: Array<any> = [];

  // model updates
  differ: any;

  // this maps the form group
  form: FormGroup;
  payload;

  constructor(
    private dformService: DFormService,
    differs: IterableDiffers
  ) {

    this.differ = differs.find([]).create(null);

  }

  ngOnInit() {

    this.form = this.dformService.toFormGroup(this.elements);

  }

  ngDoCheck() {

    let changes = this.differ.diff(this.elements);

    if (changes) {
      console.log(`Updating dynamic form`);
      this.dformService.diffFormGroup(changes, this.form);
    }

  }

  onSubmit() {

    this.payload = JSON.stringify(this.form.value);

  }

};
