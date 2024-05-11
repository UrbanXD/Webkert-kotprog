import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  standalone: true,
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(date: Date | undefined): string {
   return new DatePipe("en-US").transform(date, "yyyy/MM/dd HH:mm")?.toString() || "Ismeretlen időpont"
  }

}
