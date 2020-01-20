const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const inquirer = require("inquirer");
const fs = require("fs");

// Use inquirer to prompt the user to build an engineering team
// The engineering team should consist of one manager
// And any number of engineers and interns