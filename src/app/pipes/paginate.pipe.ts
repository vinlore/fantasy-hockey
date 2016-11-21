import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'paginate',
    pure: false
})
export class PaginatePipe implements PipeTransform {
    transform(value: any[], page = 1, pageSize = 30): any {
        if (value) {
            if (page >= 1 && pageSize >= 1 && Math.ceil(value.length/pageSize) >= page) {
                if (value.length <= pageSize) {
                    return value;
                } else {
                    let increment = (page - 1) * pageSize;
                    return value.slice(0 + increment, pageSize + increment);
                }
            } else {
                return '';
            }
        } else {
            return '';
        }
    }
}