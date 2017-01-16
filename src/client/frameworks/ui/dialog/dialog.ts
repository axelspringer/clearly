import { AsyncSubject } from 'rxjs';
import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { ViewContainerRef } from '@angular/core';

@Injectable()
export class UiDialog {

  // store open dialogs
  public openDialogs: any[] = [];

  public open(component: Component, viewRef: ViewContainerRef, config?): any {
    // self
    const openDialogs = this.openDialogs

    console.log(component, config, viewRef);

    // have new subject
    const dialogRef = openDialogs[this.openDialogs.push(new AsyncSubject()) - 1]

    this.attachDialogContainer();

    return dialogRef;
  }

  private attachDialogContainer() {

  }

}
