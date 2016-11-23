import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'teamFilter'
})
export class TeamFilterPipe implements PipeTransform {
    transform(value: any, category = 'league', subcategory: string): any {
        if (value) {
            if (category === 'conference') {
                return value.filter(val => val.conference.toLowerCase() === subcategory);
            } else if (category === 'division') {
                return value.filter(val => val.division.toLowerCase() === subcategory);
            } else {
                return value;
            }
        } else {
            return value;
        }
    }
}