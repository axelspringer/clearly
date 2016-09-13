// Importables
import {
  Component,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
  DoCheck,
  AfterViewChecked,
  IterableDiffers,
  CollectionChangeRecord,
  EventEmitter
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

  @Input('dform-data') data: Array<any> = [];
  @Output('dform-group') onFormUpdate: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  // @Output('dform-updates') payload: EventEmitter<any> = new EventEmitter();
  // @Output() onDFormUpdate: EventEmitter<any> = new EventEmitter<any>();
  // @Output() onDFormSuccess: EventEmitter<any> = new EventEmitter<any>();

  // model updates
  differ: any;

  // this maps the form group
  form: FormGroup;

  constructor(
    private dformService: DFormService,
    differs: IterableDiffers
  ) {

    this.differ = differs.find([]).create(null);

  }

  ngOnInit() {

    this.form = this.dformService.toFormGroup(this.data);

    // save for later
    // this.form.statusChanges.subscribe(status => {
    //   this.onDFormSuccess.emit(status === 'VALID' ? true : false );
    // });

  }

  ngDoCheck() {

    let changes = this.differ.diff(this.data);

    if (changes) {
      console.log(`Updating dynamic form`);
      this.dformService.diffFormGroup(changes, this.form);
      // pass along
      this.onFormUpdate.emit(this.form);
    }

  }

  // onSubmit() {

  //   this.payload.emit(JSON.stringify(this.form.value));

  // }

};
