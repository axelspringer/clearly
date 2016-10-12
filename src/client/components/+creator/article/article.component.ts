// Importables
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component } from '@angular/core';

// Components


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

  constructor() {

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    // should be unsubscribed
  }


};
