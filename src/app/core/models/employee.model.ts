export class Employee {
    public id: number;
    public firstName: string;
    public lastName: string;
    public phone: string;
    public address: string;
    public email: string;
    public roles!: string[];

    constructor(id: number, firstName: string, lastname: string, email: string, phone: string, address: string, roles: string[]) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastname;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.roles = roles;
    }
}
