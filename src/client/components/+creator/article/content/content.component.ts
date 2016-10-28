// Importables
import { Component } from '@angular/core';
import { Input } from '@angular/core';

// Components
import { DFormElement } from '../../../../core';

@Component({
  selector: 'sg-article-content',  // <sg-article-content></sg-article-content>
  styleUrls: ['./content.component.scss'],
  templateUrl: './content.component.html',
})
export class ArticleContentComponent {

  @Input() public content: Array<DFormElement<any>>;

};
