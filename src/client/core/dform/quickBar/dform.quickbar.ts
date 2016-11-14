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
import { TranslateService } from 'ng2-translate';
import { trigger } from '@angular/core';
import { MdSnackBarConfig } from '@angular/material';

// Components
import { DFormComponent } from '../dform.component';
import { DFormElement } from '../dform.element';
import { DFormComponentFocus } from '../dform.component';
import { EventEmitProvider } from '../../events';

@Component({
  selector: 'sg-dform-quickbar',
  templateUrl: './dform.quickbar.html',
  styleUrls: ['./dform.quickbar.scss'],
  animations: [
    trigger('shouldShowQuickBar', [
      state('true', style({
        opacity: 1,
      })),
      state('false', style({
        opacity: 0,
      })),
      transition('0 => 1', [animate(250)]),
      transition('1 => 0', [animate(250)]),
    ]),
  ],
  providers: [MdSnackBar],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DFormQuickBarComponent implements OnInit, OnDestroy, AfterViewInit {

  // should be refactored to some else

  @ContentChild('input') public input;
  @Input() public element: DFormElement<any>;

  public actions = [
    {
      formType: 'text',
      icon: 'short_text',
    },
    {
      formType: 'textArea',
      icon: 'wrap_text',
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
  public shouldShowQuickBar: boolean = false;

  private __emitRef: EventEmitter<any>;
  private __snackBarConfig: MdSnackBarConfig;

  constructor(
    private __ref: ChangeDetectorRef,
    private __snackBar: MdSnackBar,
    private __translate: TranslateService,
    @Inject(forwardRef(() => DFormComponent)) private __parentComponent,
  ) {
    this.__snackBarConfig = new MdSnackBarConfig();
  }

  // public

  public toggleQuickBar(): void {
    this.shouldShowQuickBar = !this.shouldShowQuickBar;
  }

  public changeFormType(newFormType: string): void {
    if (this.input.nativeElement.value !== '') {
      this.__snackBar.open(
        this.__translate.instant('DFORM.META_BAR.SNACKS.UNSAVED.MESSAGE'),
        this.__translate.instant('DFORM.META_BAR.SNACKS.UNSAVED.ACTION'),
        this.__snackBarConfig,
      );
    }
    if (this.element.controlType !== newFormType) {
      this.__parentComponent.__dForm.changeFormElement(this.element, newFormType);
    }
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
        this.__ref.markForCheck();
      });
  }

  public ngOnDestroy(): void {
    if (this.__emitRef) {
      this.__emitRef.unsubscribe();
    }
  }

};
