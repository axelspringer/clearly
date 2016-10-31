// Importables
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';

// Components
import { DFormService } from './dform.service';
import { DFormElement } from './dform.element';

@Component({
  selector: 'my-dform',
  templateUrl: './dform.component.html',
  providers: [
    DFormService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DFormComponent implements OnInit, OnDestroy {

  @Input() public elements: Array<DFormElement<any>>;
  @Output() public update: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public form: FormGroup;

  constructor(
    private dFormService: DFormService,
  ) {
  }

  public ngOnInit() {
    this.form = this.dFormService.toDForm(new FormGroup({}), this.elements);
  }

  public ngOnDestroy() {
    // this.sup.unsubscribe();
  }

};
