// Importables
import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  FormGroup
} from '@angular/forms';

// Components
import { DFormElement } from '../dform.element';

export class DFormText extends DFormElement<String> {

  controlType = 'text';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }

};

@Component({
  selector: 'dform-text',
  templateUrl: './dform.text.html',
  styleUrls: [
    './dform.text.scss'
  ]
})
export class DFormTextComponent implements OnInit {

  @Input() element: DFormElement<String>;
  @Input() form: FormGroup;

  constructor() {
  }

  ngOnInit() {
    console.log(this.element);
  }

};
