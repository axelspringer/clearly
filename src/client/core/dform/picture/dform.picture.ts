// Importables
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Renderer } from '@angular/core';

// Components
import { DFormElement } from '../dform.element';

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

  @Input() public element: DFormElement<string>;
  @Input() public form: FormGroup;

  @ViewChild('droppable') public droppable;

  constructor(
    private _renderer: Renderer,
  ) {
  }

  public onFileUpload(isUploading: boolean) {
    // this._renderer.setElementStyle(this.droppable.nativeElement, 'display', isUploading ? 'none' : null );
  }

};
