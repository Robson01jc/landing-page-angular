import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimOutletName',
})
export class TrimOutletNamePipe implements PipeTransform {
  transform(title: string, outletName: string): unknown {
    return title.trim().replace(` - ${outletName}`, '');
  }
}
