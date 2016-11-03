// Importables
import { Component, AfterViewChecked } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { Input } from '@angular/core';
import { ViewChildren, ContentChildren } from '@angular/core';
import { QueryList } from '@angular/core';
// import { MdDialog } from '@angular/material';
// import { MdDialogConfig } from '@angular/material';
// import { MdDialogRef } from '@angular/material';
import { HostListener } from '@angular/core';
import { DFormElement } from '../../../core';
import { OnInit } from '@angular/core';
import { DFormTextArea } from '../../../core/dform/textarea/dform.textarea';
import { DFormComponent } from '../../../core';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'sg-quick-write',
  styleUrls: ['./quickWrite.component.scss'],
  templateUrl: './quickWrite.component.html',
})
export class QuickWriteComponent implements OnInit, AfterViewChecked {

  @Input() public content: Array<DFormElement<any>>;
  @Input() public isEditable: Boolean = true;
  @ViewChildren(DFormComponent) public comps: any;
  @ContentChildren(QuickWriteComponent) public compz: any;
  @HostListener('DOMNodeRemoved', ['$event']) public changed(event) {
    console.log('dom changed', event);
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
  ) {
    console.log(this.viewContainerRef);
  }

  public ngOnInit() {
    console.log('init', this.comps);
  }

  public ngAfterViewChecked() {
    console.log('init', this.comps);
    console.log('init2', this.compz);
    // this.comps.changes.subscribe(el => {
    //   console.log('new elements', el);
    // });
    // console.log('after', this.comps);
  }

};
