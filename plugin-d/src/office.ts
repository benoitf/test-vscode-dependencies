
export interface OfficeInfo {
    id: number;
    description: string;
}

export interface OfficeAPI {
    registerOffice(id: number, description: string): void;
    findOffice(id: number): Promise<OfficeInfo| undefined>
    getOffice(id: number): OfficeInfo| undefined
}


export class OfficeAPIImpl implements OfficeAPI {

    private offices: Map<number, OfficeInfo>;

    constructor() {
        this.offices = new Map<number, OfficeInfo>();
    }

    registerOffice(id: number, description: string): void {
        this.offices.set(id, {id, description});
    } 
    
    async findOffice(id: number): Promise<OfficeInfo | undefined> {
        return this.getOffice(id);
    }


    getOffice(id: number): OfficeInfo | undefined {
        return this.offices.get(id);
    }


}