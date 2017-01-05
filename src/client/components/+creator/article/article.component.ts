// Importables
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { Input } from '@angular/core';

// Components
import { DFormElement } from '../../../frameworks/core';

@Component({
  selector: 'sg-article',  // <sg-article></sg-article>
  styleUrls: ['./article.component.scss'],
  templateUrl: './article.component.html',
})
export class ArticleComponent implements OnInit, OnDestroy {

  @Input() public content: Array<DFormElement<any>>;
  @Input() public metaData: Array<DFormElement<any>>;

  public ngOnInit() {
    console.log(`'${this.constructor.name}' is initialized ...`);
  }

  public ngOnDestroy() {
    // should be unsubscribed
    console.log(`'${this.constructor.name}' is destroyed ...`);
  }

};
