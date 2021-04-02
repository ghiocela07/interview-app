import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'rolesdisplay'
})

export class RolesDisplayPipe implements PipeTransform {
    transform(value: string[]): string {
        let roles = '';
        if (!value) {

            return '-';
        }
        for (let v of value) {
            if ((typeof v) !== 'string') {
                return v;
            }
            v = v.split(/(?=[A-Z])/).join(' ');
            v = v[0].toUpperCase() + v.slice(1);
            roles = roles + ', ' + v;


        }

        return roles.substring(1);

    }
}
