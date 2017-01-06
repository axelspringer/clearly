// imports
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'sg-avatar',  // <sg-avatar></sg-avatar>
  styleUrls: ['./avatar.component.scss'],
  templateUrl: './avatar.component.html',
})
export class AvatarComponent {
};
