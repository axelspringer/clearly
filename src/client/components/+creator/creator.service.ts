/* tslint:disable:max-line-length */
// Importables
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

// DForm
import { DFormElement } from '../../core';
import { DForm } from '../../core';

@Injectable()
export class CreatorService {

  private _contexts: any[] = []; // should be an object
  private _channels: any = {};
  private _form: any = {};

  private _subject: BehaviorSubject<any>
    = new BehaviorSubject({}); // its like caching

  constructor(
    private dForm: DForm,
  ) {
  }

  // set article types

  public set channels(newChannels: any) { // its the types in the service
    this._channels = Object.assign({ master: []}, newChannels);
  }

  public set contexts(newContexts: any) {
    this._contexts = newContexts;
  }

  // public

  public get form(): Observable<any> {
    this._subject.next(this.asDForm());
    return this._subject.asObservable();
  }

  // public transformToData(channels: any[], contexts: any[]) {
  //   return [[]].concat(channels).map(channel => {

  //   });
  // }

  // private

  private asDForm(): any {
    // we be a bit more expressive here


    // const acc = { master: [] };
    // const clone = _.cloneDeep(this._articleTypes[articleTypeId]);
    // const form = _.reduce(clone.contexts || [], (acc, context) => {
    //   // being a bit more expressive here
    //   !_.isEmpty(context.channels)
    //     ? _.each(context.channels, channel => {
    //       acc[channel.name] = [].concat(acc[channel.name] || [], channel);
    //     })
    //     : acc.master.push(context);
    //   return acc;
    // }, acc ); // sample a master

    // return _.toPairs(form);
  }


  // legacy

  // get form() {
  //   return this._subject.asObservable();
  // }

  public filter(channels) {
    this._next(this._channels.filter(channel => channel.isMaster || channels[channel.name]));
  }

  private _next(channels: Array<any>) {
    this._subject.next(this._transformToDForm(this._diffChannelsWithMaster(_.clone(channels))));
  }

  private _transformToDFormElement(el: string, options = {}) {
    // this is the native approach
    return this.dForm.newFormType(el)(options);
  }

  // to deform
  private _transformToDForm(channels: any) {
    return _.map(channels, channel => {
      _.each(['content', 'metaData'], type => {
        channel[type] = _.map(channel[type], el =>
          this._transformToDFormElement(el['formType'], {
            key: el['name'],
            placeholder: el['displayName'],
            fromMaster: el['fromMaster'],
          }));
      });
      return channel;
    }) as Array<DFormElement<any>>;
  }

  private _diffChannelsWithMaster(channels: any, key = 'name') {
    const master = _.head(channels.splice(channels.findIndex(el => el.isMaster), 1));
    _.map(channels, channel => {
      _.each(['content', 'metaData'], type => {
        channel[type] = _.concat(channel[type], _.map(_.filter(master[type], el => !_.find(channel[type], el[key])), el => {
          return _.assign({}, el, { fromMaster: true });
        }));
      });
      return channel;
    });
    return _.concat([], master, channels);
  }
}
