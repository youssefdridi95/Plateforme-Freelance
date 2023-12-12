import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(objs:any, term:any): any {
    if (term === undefined) {
    return objs;
    }
    return objs.filter((obj:any,term:any)=> {

    return (obj.teamTow.toLowerCase().includes(term.toLowerCase())
    || obj.date.toLowerCase().includes(term.toLowerCase())
    || obj.pertinence.toLowerCase().includes(term.toLowerCase())
    || obj.scoreTow.toLowerCase().includes(term.toLowerCase()))
    })
  }

}