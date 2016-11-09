// Importables
import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { forwardRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

// Components
import { DFormComponent } from '../dform.component';
import { DFormElement } from '../dform.element';

@Component({
  selector: 'sg-dform-quickbar',
  templateUrl: './dform.quickbar.html',
  styleUrls: ['./dform.quickbar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DFormQuickBar implements OnInit {

  @Input() public element: DFormElement<any>;

  public hasFocus: boolean = false;
  public shouldShowQuickBar: boolean = false;

  constructor(
    private ref: ChangeDetectorRef,
    @Inject(forwardRef(() => DFormComponent)) private __parentComponent,
  ) {
  }

  public ngOnInit(): void {
    console.log(`Initializing 'Changing Form'`);
  }

  public show(): void {
    this.hasFocus = true;
    this.ref.markForCheck();
  }

  public hide(): void {
    this.hasFocus = false;
    this.hideQuickBar();
    this.ref.markForCheck();
  }

  public toggleQuickBar(): void {
    this.shouldShowQuickBar = !this.shouldShowQuickBar;
  }

  public hideQuickBar(): void {
    this.shouldShowQuickBar = false;
  }

  public showQuickBar(): void {
    this.shouldShowQuickBar = true;
  }

  public changeFormType(newFormType: string, event: Event): void {
    if (this.element.controlType !== newFormType) {
      this.__parentComponent.__DForm.changeFormElement(this.element, newFormType);
    }
  }

};
