// Importables
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OnInit } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { forwardRef } from '@angular/core';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';

// Components
import { Boot } from './boot.service';
import { MainComponent } from '../main/main.component';

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
    this.boot.init$.subscribe(() => {}, () => {}, () => {
      const cmp = this.cmpFactoryResolver.resolveComponentFactory(MainComponent);
      this.viewContainerRef.createComponent(cmp);
      this.elRef.nativeElement.remove();
    });
  }

  public ngOnInit() {
    console.log('hello `Boot` component');
  }

}
