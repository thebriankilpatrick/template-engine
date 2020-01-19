const Employee = require("../lib/Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber, title) {
        super(name, id, email, title);
        this.officeNumber = officeNumber;
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
    getRole() {
        return "Manager";
    }
}

module.exports = Manager;