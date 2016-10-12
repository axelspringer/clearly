// Importables
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { DFormText } from '../../../dform';
import { Observable } from 'rxjs';

// Components

@Component({
  selector: 'article-meta',  // <article-meta></article-meta>
  providers: [
  ],
  styleUrls: [
    './meta.component.scss'
  ],
  templateUrl: './meta.component.html',
})
export class ArticleMeta implements OnInit, OnDestroy {

  public data: any;

  constructor() {
    this.data = Observable.of([
      new DFormText()
    ]);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    // should be unsubscribed
  }


};
