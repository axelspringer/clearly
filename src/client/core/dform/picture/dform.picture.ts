// Importables
import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { ViewChild } from '@angular/core';

// Components
import { DFormElement } from '../dform.element';
import { EventEmitProvider } from '../../events';
import { DFormComponentFocus } from '../dform.component';

export class DFormPicture extends DFormElement<string> {

  public controlType = 'picture';
  public type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }

};

@Component({
  selector: 'sg-dform-picture',
  templateUrl: './dform.picture.html',
  styleUrls: ['./dform.picture.scss'],
})

export class DFormPictureComponent {

  @ViewChild('droppable') public droppable;

  @HostListener('click')
  public onClick() {
    EventEmitProvider
      .connect(DFormComponentFocus.prototype.constructor.name)
      .emit(this.element.key);
  }

  @Input() public element: DFormElement<string>;
  @Input() public form: FormGroup;

  public progress: number;

  public onFileUpload(isUploading: boolean) {
    this.progress = isUploading ? 35 : undefined;
    // this._renderer.setElementStyle(this.droppable.nativeElement, 'display', isUploading ? 'none' : null );
  }

};
