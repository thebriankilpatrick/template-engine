const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

// Use inquirer to prompt the user to build an engineering team
// The engineering team should consist of one manager
// And any number of engineers and interns

// Inquirer function to prompt user for...
// email, id, and specific info based on instance
function buildTeam() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Welcome manager!  Please enter your name."
        },
        {
            type: "input",
            name: "id",
            message: "Enter your ID number."
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your office number?"
        }
    ])
}

function generateHTML(answers) {
    return `
    
    `
}

// For manager creation, and html skeleton creation
buildTeam()
    .then(function(answers) {
        const html = generateHTML(answers);

        return writeFileAsync("./output/index.html", html);
    })
    .then(function() {
        console.log("Successfully created manager card!");
    })
    .catch(function(err) {
        console.log(err);
})
// Add .then() to prompt for employee creation (engineer or intern)
// WAIT.  .appendFile() will add new content to the end of the html file.  
// This means it will add it after the </html> tag...

// RETHINK THE WRITE FILE FUNCTION

// Can I use template literal, and set as a variable
// This variable could be equal to a template literal of the card?