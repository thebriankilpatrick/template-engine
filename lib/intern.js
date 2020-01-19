const Employee = require("../lib/Employee");

class Intern extends Employee {
    constructor(id, email, title, school) {
        super(name, id, email, title);
        this.school = school;
    }
    getSchool() {
        return this.school;
    }
    getRole() {
        return "Intern";
    }
}

module.exports = Intern;