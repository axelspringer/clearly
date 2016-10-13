// Importables
import { Injectable } from '@angular/core';
// import { OnDestroy } from '@angular/core';
// import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import * as R from 'ramda';

// DForm
import { DFormText } from '../dform';
import { DFormTextArea } from '../dform/textarea/dform.textarea';
import { AppState } from '../app';
import { getChannels } from '../app';
import { DFormElement } from '../dform';

@Injectable()
export class CreatorService {

  static formElements = {
    'text': (options => new DFormText(options)),
    'textArea': (options => new DFormTextArea(options))
  };

  private _form$: BehaviorSubject<any> = new BehaviorSubject([]); // first empty channnels
  private channels$: Subscription;

  constructor(
    private store: Store<AppState>,
  ) {
    this.channels$ = this.store.let(getChannels())
      .distinctUntilChanged()
      .filter(channels => channels.length !== 0)
      .map(channels => this.toDForms(R.clone(channels)))
      .subscribe(this._form$);
  }

  get form$(): Observable<any> {
    return this._form$.asObservable();
  }

  public toDFormElement(el: string, options = {}) {
    // this is the native approach
    return CreatorService.formElements[el](options);
  }

  private toDForm(elements: any) {
    return elements.map(element => this.toDFormElement(element.formType, {
      key: element.name
    }));
  }

  private toDForms(channels: any) {
    // transform channels
    return this.theRealMagic(
      channels.map(channel => Object.assign(channel, {
        content: this.toDForm(channel.content),
        metaData: this.toDForm(channel.metaData)
      }))
    );
  }

  private theRealMagic(channels: any) {
    // make the models destructive
    const master = channels.find(channel => channel.isMaster);
    channels.forEach(channel => { // could be optimized
      if (!channel.isMaster) {
        // this does not occurs in the channel
        channel.content = channel.content.concat(
          R.differenceWith((x, y) => x['key'] === y['key'], master.content, channel.content)
          .map((el: DFormElement<any>) => {
            el.disabled = true;
            return el;
          })
        );
      }
    });
    return channels;
  } // yep, mister potter, its magic

}
