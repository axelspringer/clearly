// Importables
import { Input } from '@angular/core';
import { Component } from '@angular/core';

// Components
import { DFormElement } from '../../../dform';

@Component({
  selector: 'my-article-meta',  // <article-meta></article-meta>
  styleUrls: [
    './meta.component.scss',
  ],
  templateUrl: './meta.component.html',
})
export class ArticleMetaComponent {

  @Input('data') public metaData: Array<DFormElement<any>>;

};
