// Impotables
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'sg-loading',  // <sg-loading></sg-loading>
  styleUrls: ['./loading.style.scss'],
  templateUrl: './loading.component.html',
})
export class LoadingComponent {

  @Input() public shouldBeLoading: Observable<boolean>;

  public cssClazz: any = {
    'isLoading': true,
  };

};
