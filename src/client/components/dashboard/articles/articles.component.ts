// Impotables
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'sg-articles-list',  // <sg-articles-list></sg-articles-list>
  styleUrls: ['./articles.component.scss'],
  templateUrl: './articles.component.html',
})
export class ArticlesListComponent {

  @Input() public docs: Observable<any>;

};
