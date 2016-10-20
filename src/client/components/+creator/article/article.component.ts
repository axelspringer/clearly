// Importables
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { Input } from '@angular/core';

// Components
import { DFormElement } from './../../dform';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'article',  // <article></article>
  styleUrls: [
    './article.component.scss'
  ],
  templateUrl: './article.component.html',
})
export class Article implements OnInit, OnDestroy {

  @Input() content: Array<DFormElement<any>>;
  @Input() meta: Array<DFormElement<any>>;

  ngOnInit() {
    console.log(`'${this.constructor.name}' is initialized ...`);

  }

  ngOnDestroy() {
    // should be unsubscribed
    console.log(`'${this.constructor.name}' is destroyed ...`);
  }


};
