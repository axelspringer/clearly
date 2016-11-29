/* tslint:disable:max-line-length */
// Importables
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

// DForm
import { DForm } from '../../../core';

@Injectable()
export class ArticleService {

  constructor(
    private _dformService: DForm,
  ) {
  }

  public transformToMaster(contexts: any[]) {
    return _.map(_.filter(contexts, context => context['channels'].length === 0),
      context => this._transformToFormElement(context)); // should also filter for not channel
  }

  public transformToChannels(contexts: any[], channels: any[]) {
    return _.map(channels, channel => {
      return _.map(_.filter(contexts, context =>
        context['channels'].length === 0 || _.includes(context.channels, channel.id)),
          context => this._transformToFormElement(context));
          // should map the object, metadata in dform object
    });
  }

  // private
  private _transformToFormElement(context: any) {
    return this._dformService.newFormType(context.formType.name)(context.formType.options);
  }

}
