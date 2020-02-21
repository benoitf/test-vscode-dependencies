export interface CityAPI {
    registerCity(city: string): void
    getCities() : Promise<Array<string>>
}


export class CityAPIImpl implements CityAPI {

    private cities: Array<string>;

    constructor() {
        this.cities = [];
    }

    registerCity(city: string): void {
        this.cities.push(city);    
    }
    
    
    async getCities(): Promise<string[]> {
        return this.cities;
    }


}