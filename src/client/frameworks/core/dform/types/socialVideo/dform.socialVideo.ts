/* tslint:disable: max-classes-per-file */
// Importables
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

// Components
import { DFormElement } from '../../dform.element';
import { CustomValidators } from '../../../forms';

export class DFormSocialVideo extends DFormElement<string> {

  public controlType = 'socialVideo';
  public type: string;
  public isValidVideo = false;
  public videoLink = '';

  constructor(options: {} = {}) {
    super(<any> { ... options,
      validators: [Validators.required, CustomValidators.socialVideoValidator]});
    this.type = options['type'] || '';
  }

  public checkVal(key: string, value: string) {
    console.log(`checked => key: ${key}, value: ${value}`);
  }

};

@Component({
  selector: 'sg-dform-socialvideo',
  templateUrl: './dform.socialVideo.html',
  styleUrls: ['./dform.socialVideo.scss'],
})
export class DFormSocialVideoComponent implements OnInit {

  @Input() public element: DFormElement<string>;
  @Input() public form: FormGroup;

  public ngOnInit() {
    console.log('FORMZ', this.form);
  }


  public validateVideoLink(key: string, value: string): void {

      console.log('TADAAAAA! validateVideoLink');

      console.log(value);
      console.log(this.form.controls[key]);
      console.log(this.element);
      // console.log(this.element["videoLink"]);
  }

  /*validateSocialVideo(c: FormControl) {
    let VIDEO_REGEX = "/http:\/\/(?:www.)?(?:(vimeo).com\/(.*)|(youtube).com\/watch\?v=(.*?)&)/";

    return VIDEO_REGEX.test(c.value) ? null : {
      validateSocialVideo: {
        valid: false
      }
    };
  }*/

};
