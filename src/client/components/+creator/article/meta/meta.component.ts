// Importables
import { OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { DFormText } from '../../../dform';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

// Components
import { AppState } from '../../../app';
import { DFormElement } from '../../../dform';
import { CreatorService } from '../../creator.service';

@Component({
  selector: 'article-meta',  // <article-meta></article-meta>
  styleUrls: [
    './meta.component.scss'
  ],
  templateUrl: './meta.component.html',
})
export class ArticleMeta implements OnInit, OnDestroy {

  @Input('data') metaData: Array<DFormElement<any>>;

  ngOnInit() {

  }

  ngOnDestroy() {
    // should be unsubscribed
  }


};
