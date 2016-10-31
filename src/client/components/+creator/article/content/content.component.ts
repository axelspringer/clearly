// Importables
import { OnDestroy } from '@angular/core';
import { Component } from '@angular/core';

// Components

@Component({
  selector: 'sg-article-content',  // <sg-article-content></sg-article-content>
  providers: [
  ],
  styleUrls: [
    './content.component.scss',
  ],
  templateUrl: './content.component.html',
})
export class ArticleContentComponent implements OnDestroy {

  public data: any;

  public ngOnDestroy() {
    // should be unsubscribed
  }

};
