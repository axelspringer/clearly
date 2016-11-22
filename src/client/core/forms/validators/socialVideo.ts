// Importables
import { AbstractControl } from '@angular/forms';

export default function socialVideoValidator(control: AbstractControl): { [key: string]: any } {
  const linkRegEx = /(https:|)\/\/(player.|www.)?(vimeo\.com|youtube\.com)\/(video\/|embed\/)?([A-Za-z0-9.]*)?/;
  const link = control.value;

  return linkRegEx.test(link)
    ? { 'socialvideo': true }
    : null;
}
