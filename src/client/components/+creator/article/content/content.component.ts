// Importables
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { DFormText } from '../../../dform';
import { Observable } from 'rxjs';

// Components

@Component({
  selector: 'article-content',  // <article-content></article-content>
  providers: [
  ],
  styleUrls: [
    './content.component.scss'
  ],
  templateUrl: './content.component.html',
})
export class ArticleContent implements OnInit, OnDestroy {

  public data: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // should be unsubscribed
  }

};
