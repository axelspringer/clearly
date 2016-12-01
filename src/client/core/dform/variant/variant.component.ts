// Importables
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { FormControl } from '@angular/forms';
// import { OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'sg-dform-variant',
  styleUrls: ['./variant.component.scss'],
  templateUrl: './variant.component.html',
})
export class DFormVariantComponent implements OnInit {

  @Input() public form: FormControl;
  @Input()
  public set index(newIndex: number) {
    this._index = ++newIndex;
  };

  public get index(): number {
    return this._index;
  };

  @Output() public isFaved = new EventEmitter();

  public classz = {
    'fa-star': false,
    'fa-star-o': false,
  };

  private _index = 1;

  // angular

  public ngOnInit() {
    this.form.setValue({
      isFav: false,
      value: '',
    });
    this.form.valueChanges.subscribe(change => {
      console.log('CHANGE', this._index, change);
      this.setClassz(change.isFav);
    });
  }

  // public

  public fav() {
    this.isFaved.emit(this._index);
  }

  public setClassz(isFav: boolean) {
    this.classz['fa-star'] = isFav;
    this.classz['fa-star-o'] = !isFav;
  }

};
