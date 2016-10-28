// Importables
import { Input } from '@angular/core';
import { Component } from '@angular/core';

// Components
import { DFormElement } from '../../../../core';

@Component({
  selector: 'sg-article-meta',  // <sg-article-meta></sg-article-meta>
  styleUrls: [
    './meta.component.scss',
  ],
  templateUrl: './meta.component.html',
})
export class ArticleMetaComponent {

  @Input() public metaData: Array<DFormElement<any>>;

};
