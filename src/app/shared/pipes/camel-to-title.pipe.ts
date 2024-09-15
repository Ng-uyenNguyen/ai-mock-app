import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelToTitle'
})
export class CamelToTitlePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    // Insert a space before all uppercase letters and capitalize the first letter of each word
    const result = value
      .replace(/([A-Z])/g, ' $1') // Insert space before capital letters
      .replace(/^./, str => str.toUpperCase()); // Capitalize the first letter

    return result.trim();
  }
}