// Importables
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

// Components
import { EventEmitProvider } from '../../events';
import { DFormVariantRemoveEvent } from '../dform.element.abstract';
import { DFormVariantAddEvent } from '../dform.element.abstract';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'sg-dform-variant',
  styleUrls: ['./variant.component.scss'],
  templateUrl: './variant.component.html',
})
export class DFormVariantComponent implements OnInit {

  @Input() public form: FormControl;
  @Input() public get index(): number {
    return this._index;
  };

  public set index(newIndex: number) {
    this._index = ++newIndex;
  };

  @Output() public isFaved = new EventEmitter();
  @Output() public removeVariant = new EventEmitter();

  public showDelete: Observable<boolean>;

  private _classz = {
    'fa-star': false,
    'fa-star-o': true,
  };
  private _index = 1;
  private _subject = new BehaviorSubject(this._classz);

  // angular

  public ngOnInit() {
    this.form.setValue({
      isFav: false,
      value: '',
    });
    this.form.valueChanges.subscribe(change => {
      this._subject.next(this.setClassz(change.isFav));
    });
    this.showDelete = Observable.merge(
      EventEmitProvider
        .connect(DFormVariantRemoveEvent.constructor.name),
      EventEmitProvider
        .connect(DFormVariantAddEvent.constructor.name),
    )
    .combineLatest()
    .switchMap(() => Observable.of(this.form.parent.controls['length'] > 1));
  }

  // public

  public get classz(): Observable<any> {
    return this._subject;
  }

  public fav() {
    this.isFaved.emit(this._index);
  }

  public remove() {
    this.removeVariant.emit(this._index);
  }

  public removeElement(event) {
    console.log(event);
  }

  public setClassz(isFav: boolean) {
    this._classz['fa-star'] = isFav;
    this._classz['fa-star-o'] = !isFav;
    return this._classz;
  }

};
