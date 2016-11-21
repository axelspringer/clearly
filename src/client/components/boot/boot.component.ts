// Importables
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OnInit } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { AppComponent } from '../app';
import { ComponentFactoryResolver } from '@angular/core';
import { ElementRef } from '@angular/core';
import { forwardRef } from '@angular/core';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';

// Components
import { Boot } from './boot.service';

@Component({
  selector: 'sg-boot',  // <sg-dashboard></sg-dashboard>
  styleUrls: ['./boot.component.scss'],
  templateUrl: './boot.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class BootComponent implements OnInit {

  public message$: Observable<string>;

  // TypeScript public modifiers
  constructor(
    @Inject(forwardRef(() => Boot)) public boot: Boot,
    private viewContainerRef: ViewContainerRef,
    private cmpFactoryResolver: ComponentFactoryResolver,
    private elRef: ElementRef,
  ) {
    this.message$ = this.boot.message$;
    const sup = this.boot.init$.subscribe(() => {}, () => {}, () => {
      const cmp = this.cmpFactoryResolver.resolveComponentFactory(AppComponent);
      this.viewContainerRef.createComponent(cmp);
      this.elRef.nativeElement.remove();
      sup.unsubscribe();
    });
  }

  public ngOnInit() {
    console.log('hello `Boot` component');
  }

}
