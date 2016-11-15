// Importables
import { AfterViewInit } from '@angular/core';
import { animate } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { ContentChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { forwardRef } from '@angular/core';
import { Inject } from '@angular/core';
import { Input } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { state } from '@angular/core';
import { style } from '@angular/core';
import { transition } from '@angular/core';
// import { TranslateService } from 'ng2-translate';
import { trigger } from '@angular/core';
import { MdSnackBarConfig } from '@angular/material';

// Components
import { DFormComponent } from '../dform.component';
import { DFormElement } from '../dform.element';
import { DFormComponentFocus } from '../dform.component';
import { EventEmitProvider } from '../../events';

@Component({
  selector: 'sg-dform-quickedit',
  templateUrl: './dform.quickEdit.html',
  styleUrls: ['./dform.quickEdit.scss'],
  animations: [
    trigger('shouldShowQuickBar', [
      state('true', style({
        opacity: 1,
      })),
      state('false', style({
        opacity: 0,
        display: 'none',
      })),
      transition('0 => 1', [animate(250)]),
      transition('1 => 0', [animate(250)]),
    ]),
  ],
  providers: [MdSnackBar],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DFormQuickEditComponent implements OnInit, OnDestroy, AfterViewInit {

  // should be refactored to some else

  @ContentChild('input') public input;
  @Input() public element: DFormElement<any>;

  public actions = [
    {
      formType: 'abstract',
      icon: 'short_text',
    },
    {
      formType: 'mainText',
      icon: 'subject',
    },
    {
      formType: 'socialVideo',
      icon: 'ondemand_video',
    },
    {
      formType: 'dropDown',
      icon: 'playlist_add',
    }
  ];
  public hasFocus: boolean = false;
  public shouldShowQuickEdit: boolean = false;

  private __emitRef: EventEmitter<any>;
  private __snackBarConfig: MdSnackBarConfig;

  constructor(
    private __ref: ChangeDetectorRef,
    // private __snackBar: MdSnackBar,
    // private __translate: TranslateService,
    @Inject(forwardRef(() => DFormComponent)) private __parentComponent,
  ) {
    this.__snackBarConfig = new MdSnackBarConfig();
  }

  // public

  public toggleQuickBar(): void {
    this.shouldShowQuickEdit = !this.shouldShowQuickEdit;
  }

  public removeFormElement(element: DFormElement<any>) {
    this.__parentComponent.removeFormElement(element);
  }

  public changeFormElementType(element: DFormElement<any>, formType: string) {
    this.__parentComponent.changeFormElementType(element, formType);
  }

  // angular

  public ngOnInit(): void {
    console.log(`Initializing ${this.constructor.name}`);
  }

  public ngAfterViewInit(): void {
    this.__emitRef = EventEmitProvider
      .connect(DFormComponentFocus.prototype.constructor.name)
      .subscribe(cmp => {
        this.hasFocus = this.element.key === cmp;
        this.shouldShowQuickEdit = false;
        this.__ref.markForCheck();
      });
  }

  public ngOnDestroy(): void {
    if (this.__emitRef) {
      this.__emitRef.unsubscribe();
    }
  }

};
