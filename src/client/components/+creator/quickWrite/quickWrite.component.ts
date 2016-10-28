// Importables
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
// import { MdDialog } from '@angular/material';
// import { MdDialogConfig } from '@angular/material';
// import { MdDialogRef } from '@angular/material';

// Components
import { DFormElement } from '../../../core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'sg-quick-write',
  styleUrls: ['./quickWrite.component.scss'],
  templateUrl: './quickWrite.component.html',
})
export class QuickWriteComponent {

  @Input() public content: Array<DFormElement<any>>;
  @Input() public isEditable: Boolean = true;

};