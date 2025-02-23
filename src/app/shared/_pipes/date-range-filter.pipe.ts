
  import { Pipe, PipeTransform } from '@angular/core';

  @Pipe({
    name: 'dateRangeFilter',
    standalone: true, // Angular 15+ standalone pipe
  })
  export class DateRangeFilterPipe implements PipeTransform {
    transform(items: any[], startDate: Date | null, endDate: Date | null, dateField: string): any[] {
      if (!items || !dateField || !startDate || !endDate) return items;
  
      const start = new Date(startDate).setHours(0, 0, 0, 0); // Normalize start date
      const end = new Date(endDate).setHours(23, 59, 59, 999); // Normalize end date
  
      return items.filter(item => {
        if (!item[dateField]) return false; // Skip if column is missing
        const itemDate = new Date(item[dateField]).getTime();
        return itemDate >= start && itemDate <= end;
      });
    }
  }