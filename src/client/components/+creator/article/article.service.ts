/* tslint:disable:max-line-length */
// Importables
import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { DFORM_TYPES_TOKEN } from '../../../frameworks/dform';
import * as _ from 'lodash';

@Injectable()
export class ArticleUtils {

  // private worker: Worker = new (<any>require('worker-loader?name=form.js!../../../workers/form'));

  constructor(
    @Inject(DFORM_TYPES_TOKEN) private formTypes,
  ) {

    // this.worker.addEventListener('message', (e: MessageEvent) => {
    //   console.log(e);
    // });
  }

  public transformToMaster(contexts: any[]) {
    return _.map(_.filter(contexts, context => context.formType.options.channels.length === 0),
      context => this.toFormElement(context)); // should also filter for not channel
  }

  public transformToChannels(contexts: any[], channels: any[]) {
    return _.map(channels, channel => {
      return _.map(_.filter(contexts, context =>
        context.formType.options.channels.length === 0 || _.includes(context.formType.options.channels, channel.id)),
          context => this.toFormElement(context, channel.id));
          // should map the object, metadata in dform object
    });
  }

  // private

  // private filterMasterContexts(contexts: any[]) {
  //   return contexts.filter(context => context.formType.options.channels.length === 0)
  // }

  private toFormElement(context: any, channel?: number) {
    // self
    const formTypes = this.formTypes;

    return formTypes(context.formType.name, ({
      ...context.formType.options,
      channel,
      key: context.name,
      subject: context.displayName
    })).toClass();
  }

}
