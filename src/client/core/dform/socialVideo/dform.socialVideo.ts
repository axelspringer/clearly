// Importables
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';

// Components
import { DFormElement } from '../dform.element';

export class DFormSocialVideo extends DFormElement<string> {

  public controlType = 'socialVideo';
  public type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }

};

@Component({
  selector: 'sg-dform-socialvideo',
  templateUrl: './dform.socialVideo.html',
  styleUrls: ['./dform.socialVideo.scss'],
})
export class DFormSocialVideoComponent {

  @Input() public element: DFormElement<string>;
  @Input() public form: FormGroup;

};
