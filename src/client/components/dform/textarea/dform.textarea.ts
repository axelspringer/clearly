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

export class DFormTextArea extends DFormElement<string> {

  controlType = 'textArea';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }

};

@Component({
  selector: 'dform-textarea',
  templateUrl: './dform.textarea.html',
  styleUrls: [
    './dform.textarea.scss'
  ]
})
export class DFormTextAreaComponent implements OnInit {

  @Input() element: DFormElement<string>;
  @Input() form: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }

};
