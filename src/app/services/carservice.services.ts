import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Car } from '../entity/car.entity';

@Injectable({
    providedIn: 'root'
})
export class CarService {
    constructor(private http: HttpClient) {}
    //car: Car;

    getCarsSmall() {

        return this.http.get('assets/DataCar.json')
                    .toPromise()
                    .then(res => <Car[]> res )
                    .then(data => { return data; });
       
        //return this.http.get('assets/DataCar.json');
    }
    
}