// Importables
import {
  Component,
  Input,
  Output,
  OnInit,
  IterableDiffers,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

// Components
import { DFormService } from './dform.service';

@Component({
  selector: 'dform',
  templateUrl: './dform.component.html',
  providers: [
    DFormService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DFormComponent implements OnInit {

  @Input('dform-data') data: Observable<any>;
  @Output('dform-group') onFormUpdate: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  // model updates
  differ: any;

  // this maps the form group
  form: FormGroup;

  constructor(
    private dform: DFormService,
    differs: IterableDiffers
  ) {

    this.differ = differs.find([]).create(null);
    this.form = new FormGroup({});

  }

  ngOnInit() {

    this.data.subscribe(data => {
      let changes = this.differ.diff(data);

      if (changes) {
        this.form = this.dform.updateFormGroup(changes, this.form);
        this.onFormUpdate.emit(this.form);
      }
    });

  }

};
