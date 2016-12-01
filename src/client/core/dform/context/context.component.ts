// Importables
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'sg-dform-context',
  styleUrls: ['./context.component.scss'],
  templateUrl: './context.component.html',
})
export class DFormContextComponent {

  @Input() public subject = 'Untitled';
  @Output() public addVariant = new EventEmitter();

  // angular

  // public

  public doAddVariant(event: Event) {
    event.preventDefault();
    this.addVariant.emit(true);
  }

};
