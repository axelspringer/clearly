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
  @Input()
    public set type (newType: string) {
      this.contextType = newType === 'meta'
        ? 'DFORM.CONTEXT.TYPE.META'
        : 'DFORM.CONTEXT.TYPE.CONTENT';
    }
  @Input() public variants = 0;
  @Output() public addVariant = new EventEmitter();

  public contextType: string;

  // angular

  // public

  public doAddVariant(event: Event) {
    event.preventDefault();
    this.addVariant.emit(true);
  }

  public doCopyContext(event: Event) {
    event.preventDefault();
  }

  public doSetVariant(event: Event) {
    event.preventDefault();
  }

};
