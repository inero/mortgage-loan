export interface ICustomer {
    id?:string;
    personal?: IPersonal;
    loan?: ILoan;
    property?: IProperty;
    estimation?: IEstimation;
}

export interface IPersonal {
    name:string;
    age:number;
    email:string;
    mobile:string;
    address: IAddress;
}

export interface IAddress {
    street?: string;
    city?: string;
    pincode?: number;
    country?: string;
}

export interface ILoan {
    amount: number;
    tenure: number;
    occupation: string;
    monthlyIncome: number;
    monthlyEMI: number;
}

export interface IProperty {
    propertySize: number;
    propertyType: string;
    propertyArea: string;
    propertyAge: string;
}

export interface IEstimation {
    mortgageValue: number;
    sanctionedAmount: number;
    offeringAmount: number;
    eligiblility: boolean;
    EMIAmount: number;
    EMITenure: number;
}
