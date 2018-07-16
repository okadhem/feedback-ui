import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "tempUnit"
})
export class TempUnitPipe implements PipeTransform {

    transform(temp:number, tempUnit:string) {
        switch(tempUnit){
            case 'f':
                return Number(temp).toFixed(0) + '°' + 'f';
            default:
                const celcius = (temp - 32) * 0.5556;
                return Number(celcius).toFixed(0) + '°' + 'c';
        }
    }


}
