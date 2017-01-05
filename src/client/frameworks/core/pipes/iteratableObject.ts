// Importables
import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';

@Pipe({
  name: 'sgIteratableObject',
})
export class IteratableObjectPipe implements PipeTransform {

  public transform(value: any): any[] {
    return Object.keys(value).map(key => {
      return Object.assign({}, { key }, {value: value[key]});
    });
  }

};
