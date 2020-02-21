pluginA --> pluginB --> pluginC
        --> pluginD



pluginB:
method : 
    registerEmployee(firstname, lastname)
    findEmployee(firstname, lastname): Promise<Employee| undefined>

pluginC
method:
    registerCity(city: name): void
    getCities() : Promise<Array<string>>


pluginD
method: 
    registerOffice(number, description)
    findOffice(number): Promise<OfficeInfo| undefined>
    getOffice(number): OfficeInfo| undefined