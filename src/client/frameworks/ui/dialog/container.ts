import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <clr-modal [(clrModalOpen)]="opened" [clrModalClosable]="isOpen"></clr-modal>
  `
})
export class UiDialogContainerComponent {

}
