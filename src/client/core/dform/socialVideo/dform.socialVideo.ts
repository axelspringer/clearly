// Importables
import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Input } from '@angular/core';

// Components
import { DFormElement } from '../dform.element';

export class DFormSocialVideo extends DFormElement<string> {

  public controlType = 'socialVideo';
  public type: string;
  public isValidVideo = false;
  public videoLink = "";

  constructor(options: {} = {}) {
    super(options);
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
export class DFormSocialVideoComponent {

  @Input() public element: DFormElement<string>;
  @Input() public form: FormGroup;


  public validateVideoLink(key: string, value: string):void {

      console.log("TADAAAAA! validateVideoLink");

      // const VIDEO_REGEX = "/http:\/\/(?:www.)?(?:(vimeo).com\/(.*)|(youtube).com\/watch\?v=(.*?)&)/";
      const VIDEO_REGEX = "[0-9]";

      // validiere videoLink
      // set isValidVideo = true
      //this.element["videoLink"] = value;
      //this.element["isValidVideo"] = true;
      this.form.controls[key].setValidators([Validators.required, Validators.pattern(VIDEO_REGEX)]);

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
