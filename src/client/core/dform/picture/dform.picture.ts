/* tslint:disable: max-classes-per-file */
// Importables
import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { ViewChild } from '@angular/core';

// Components
import { DFormElement } from '../dform.element';
// import { EventEmitProvider } from '../../events';
import { IDFormElementOptions } from '../dform.element';

export class DFormPicture extends DFormElement<string> {

  public controlType = 'picture';
  public type: string;

  constructor(options: {} = {}) {
    super(<IDFormElementOptions<string>> options);
    this.type = options['type'] || '';
  }

};

@Component({
  selector: 'sg-dform-picture',
  templateUrl: './dform.picture.html',
  styleUrls: ['./dform.picture.scss'],
})

export class DFormPictureComponent {

  @Input() public element: DFormElement<string>;
  @Input() public form: FormGroup;

  @ViewChild('droppable') public droppable;

  @HostListener('click')
  public onClick() {
    // EventEmitProvider
    //   .connect(DFormComponentFocus.prototype.constructor.name)
    //   .emit(this.element.key);
  }

  public progress: number;

  public onFileUpload(isUploading: boolean) {
    this.progress = isUploading ? 35 : undefined;
  }

};
