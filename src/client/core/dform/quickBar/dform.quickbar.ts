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

// Components
import { DFormComponent } from '../dform.component';
import { DFormElement } from '../dform.element';
import { DFormComponentFocus } from '../dform.component';
import { EventEmitProvider } from '../../events';

@Component({
  selector: 'sg-dform-quickbar',
  templateUrl: './dform.quickbar.html',
  styleUrls: ['./dform.quickbar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DFormQuickBarComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() public element: DFormElement<any>;

  public hasFocus: boolean = false;
  public shouldShowQuickBar: boolean = false;

  private __emitRef: EventEmitter<any>;

  constructor(
    private __ref: ChangeDetectorRef,
    @Inject(forwardRef(() => DFormComponent)) private __parentComponent,
  ) { }

  // public

  public toggleQuickBar(): void {
    this.shouldShowQuickBar = !this.shouldShowQuickBar;
  }

  public changeFormType(newFormType: string): void {
    if (this.element.controlType !== newFormType) {
      this.__parentComponent.__DForm.changeFormElement(this.element, newFormType);
    }
  }

  public ngOnInit(): void {
    console.log(`Initializing ${this.constructor.name}`);
  }

  // angular

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
