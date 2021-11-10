import { Pipe, PipeTransform } from '@angular/core';
/*
 * Replace the underscore with space 
*/
@Pipe({name: 'underscore'})
export class UnderscorePipe implements PipeTransform {
  transform(value: string): string {
    return  value.replace(/\_/g, ' ');
  }
}