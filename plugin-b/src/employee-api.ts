export interface Employee {
    firstname: string,
    lastname: string

}
export interface EmployeeAPI {
    registerEmployeeWithString(firstname: string, lastname: string): void
    registerEmployeeWithType(employee: Employee): void;
    findAsyncEmployee(firstname: string, lastname: string): Promise<Employee| undefined>
}

export class EmployeeAPIImpl implements EmployeeAPI {


    private employees: Map<string, Employee>;
    constructor() {
        this.employees = new Map<string, Employee>();
    }

    registerEmployeeWithString(firstname: any, lastname: any) {
        this.registerEmployeeWithType({firstname, lastname});
    }
    
    
    registerEmployeeWithType(employee: Employee) {
        this.employees.set(employee.firstname + employee.lastname, employee);
    }

    async findAsyncEmployee(firstname: any, lastname: any): Promise<Employee | undefined> {
        return this.employees.get(firstname + lastname);    
    }



}