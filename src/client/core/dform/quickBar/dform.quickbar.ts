// Importables
import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { forwardRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { TranslateService } from 'ng2-translate';
import { ElementRef } from '@angular/core';
import { ContentChild } from '@angular/core';

// Components
import { DFormComponent } from '../dform.component';
import { DFormElement } from '../dform.element';
import { DFormComponentFocus } from '../dform.component';
import { EventEmitProvider } from '../../events';

@Component({
  selector: 'sg-dform-quickbar',
  templateUrl: './dform.quickbar.html',
  styleUrls: ['./dform.quickbar.scss'],
  providers: [MdSnackBar],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DFormQuickBarComponent implements OnInit, OnDestroy, AfterViewInit {

  // should be refactored to some else

  public actions = [
    {
      formType: 'text',
      icon: 'short_text'
    },
    {
      formType: 'textArea',
      icon: 'wrap_text'
    },
  ];

  @Input() public element: DFormElement<any>;
  @ContentChild('input') public input;

  public hasFocus: boolean = false;
  public shouldShowQuickBar: boolean = false;

  private __emitRef: EventEmitter<any>;

  constructor(
    private __ref: ChangeDetectorRef,
    private __snackBar: MdSnackBar,
    private __translate: TranslateService,
    @Inject(forwardRef(() => DFormComponent)) private __parentComponent,
  ) { }

  // public

  public toggleQuickBar(): void {
    this.shouldShowQuickBar = !this.shouldShowQuickBar;
  }

  public changeFormType(newFormType: string): void {
    if (this.input.nativeElement.value !== '') {
      this.__snackBar.open(
        this.__translate.instant('DFORM.META_BAR.SNACKS.UNSAVED.MESSAGE'),
        this.__translate.instant('DFORM.META_BAR.SNACKS.UNSAVED.ACTION'));
    }
    if (this.element.controlType !== newFormType) {
      this.__parentComponent.__DForm.changeFormElement(this.element, newFormType);
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
