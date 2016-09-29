// Impotables
import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Input } from '@angular/core';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  selector: 'loading',  // <loading></loading>
  styleUrls: ['./loading.style.scss'],
  templateUrl: './loading.component.html'
})
export class Loading implements OnInit {

  @Input() shouldBeLoading: Observable<boolean>;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }


};
