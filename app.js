const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);


function buildTeam() {
    inquirer.prompt([
        {
            type: "input",
            name: "team",
            message: "What is your team name?"
        },
        {
            type: "input",
            name: "engAmount",
            message: "How many engineers are on your team?"
        },
        {
            type: "input",
            name: "intAmount",
            message: "How many interns are on your team?"
        }
    ]).then(function(answers) {
        promptManager(answers);
    })
}

buildTeam();

let theManager = [];

function promptManager(answers) {
    inquirer.prompt([
        {
            type: "input",
            name: "manName",
            message: "What is the manager's name?"
        },
        {
            type: "input",
            name: "manID",
            message: "What is the manager's ID number?"
        },
        {
            type: "input",
            name: "manEmail",
            message: "What is the manager's email?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number?"
        }
    ]).then(function(managers) {
        const manager = new Manager(managers.manName, managers.manID, managers.manEmail, managers.officeNumber);
        theManager.push(manager);
        if (answers.engAmount > 0) {
            promptEngineers(answers);
        }
        else if (answers.intAmount > 0) {
            promptInterns(answers);
        }
        else {
            writeFile(answers);
        }
    })
}

let i = 0;
let engineerArray = [];

function promptEngineers(answers) {
    i++;
    inquirer.prompt([
        {
            type: "input",
            name: "engName",
            message: `What is the #${i} engineer's name?`
        },
        {
            type: "input",
            name: "engID",
            message: `What is the #${i} engineer's ID number?`
        },
        {
            type: "input",
            name: "engEmail",
            message: `What is #${i} engineer's email?`
        },
        {
            type: "input",
            name: "engGithub",
            message: `What is the #${i} engineer's Github?`
        }
    ]).then(function(engineers) {
        const engineer = new Engineer(engineers.engName, engineers.engID, engineers.engEmail, engineers.engGithub);
        engineerArray.push(engineer);
        if (i >= answers.engAmount) {
            console.log(`Created ${i} engineer cards.`);
            i = 0;
            if (answers.intAmount > 0) {
                promptInterns(answers);
            }
            else {
                writeFile(answers);
            }
        }
        else {
            promptEngineers(answers); // Recursion
        }
    })
}

let internArray = [];

function promptInterns(answers) {
    i++;
    inquirer.prompt([
        {
            type: "input",
            name: "intName",
            message: `What is the #${i} intern's name?`
        },
        {
            type: "input",
            name: "intID",
            message: `What is the #${i} intern's ID number?`
        },
        {
            type: "input",
            name: "intEmail",
            message: `What is #${i} intern's email?`
        },
        {
            type: "input",
            name: "intSchool",
            message: `Where does the #${i} intern go to school?`
        }
    ]).then(function(interns) {
        const intern = new Intern(interns.intName, interns.intID, interns.intEmail, interns.intSchool);
        internArray.push(intern);
        if (i >= answers.intAmount) {
            console.log(`Created ${i} intern cards.`);
            writeFile(answers);
        }
        else {
            promptInterns(answers); // Recursion
        }
    })
}

const writeFile = function(answers) {
    const html = generateHTML(answers);
    writeFileAsync(__dirname + "/output/team.html", html);
} 


function generateHTML(answers, engineer, intern, manager) {
    return `
    <!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.2.7/dist/css/uikit.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://kit.fontawesome.com/5442a2e73b.js" crossorigin="anonymous"></script>
        <link rel="stylesheet" type="text/css" href="../assets/style.css">
        <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
    </head>

    <body>

        <div class="uk-navbar-container" uk-navbar>
            <div class="uk-navbar-center">
                <span class="uk-navbar-item uk-logo uk-navbar-center" id="navBrand">${ answers.team }</span>
            </div>
        </div>

        <div class="container">
            <div class="row">
                ${generateManagerHTML(manager)}
                ${generateEngineerHTML(engineer, engineerArray)}
                ${generateInternHTML(intern, internArray)}
            </div>
        </div>
        
    </body>
</html>
    `
}

function generateManagerHTML(manager) {
    let manHTML = ``;
    manHTML += managerTemplate(theManager[0]);

    return manHTML;
}

function managerTemplate(manager) {
    return `
    <div class="col s6 m4 l4">
        <div class="card grey lighten-4 uk-card-hover">
            <div class="card-content">
                <div>
                    <i class="fas fa-user-tie fa-3x" id="titleIcon"></i>
                </div>
                <div class="cardName">
                    <span class="card-title">${manager.name}</span>
                    <p class="uk-text-meta uk-margin-remove-top">Manager</p>
                </div>
                <br>
                <p>ID: ${manager.id}</p>
                <p>Office Number: ${manager.officeNumber}</p>
            </div>
            <div class="card-action">
                <a href="#">${manager.email}</a>
            </div>
        </div>
    </div>
    `
}

function generateEngineerHTML(engineer) {

    let engHTML = ``;

    for(var en = 0; en < engineerArray.length; en++) {
        engHTML += engineerTemplate(engineerArray[en]);
    }

    return engHTML;
}

function engineerTemplate(engineer) {
    return  `
    <div class="col s6 m4 l4">
    <div class="card grey lighten-4 uk-card-hover">
        <div class="card-content">
            <div>
                <i class="fas fa-laptop-code fa-3x" id="titleIcon"></i>
            </div>
            <div class="cardName">
                <span class="card-title">${engineer.name}</span>
                <p class="uk-text-meta uk-margin-remove-top">Engineer</p>
            </div>
            <br>
            <p>ID:${engineer.id}</p>
            <p>Github:${engineer.github}</p>
        </div>
        <div class="card-action">
            <a href="#">${engineer.email}</a>
        </div>
    </div>
</div>
    `
}

function generateInternHTML(intern) {

    let intHTML = ``;

    for(var int = 0; int < internArray.length; int++) {
        intHTML += internTemplate(internArray[int]);
    }

    return intHTML;
}

function internTemplate(intern) {
    return `
    <div class="col s6 m4 l4">
        <div class="card grey lighten-4 uk-card-hover">
            <div class="card-content">
                <div>
                    <i class="fas fa-user-graduate fa-3x" id="titleIcon"></i>
                </div>
                <div class="cardName">
                    <span class="card-title">${intern.name}</span>
                    <p class="uk-text-meta uk-margin-remove-top">Intern</p>
                </div>
                <br>
                <p>ID: ${intern.id}</p>
                <p>School: ${intern.school}</p>
            </div>
            <div class="card-action">
                <a href="#">${intern.email}</a>
            </div>
        </div>
    </div>
    `
}

