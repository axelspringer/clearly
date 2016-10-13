// Importables
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { Input } from '@angular/core';

// Components
import { DFormElement } from './../../dform';

@Component({
  selector: 'article',  // <article></article>
  providers: [
  ],
  styleUrls: [
    './article.component.scss'
  ],
  templateUrl: './article.component.html',
})
export class Article implements OnInit, OnDestroy {

  @Input() content: Array<DFormElement<any>>;
  @Input() meta: Array<DFormElement<any>>;

  constructor() {

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    // should be unsubscribed
  }


};
