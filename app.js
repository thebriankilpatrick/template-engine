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
            message: "How many intern are on your team?"
        }
    ]).then(function(answers) {
        promptEngineers(answers);
    })
}

buildTeam();

let i = 0;
let engineerArray = [];
// TODO:  declare engeneers array here
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
        const engineer = new Engineer(engineers.engName, engineers.engID, engineers.engEmail, "Engineer", engineers.engGithub);
        engineerArray.push(engineer);
        if (i >= answers.engAmount) {
            // console.log(engineerArray)
            console.log(`Created ${i} engineeer cards.`);
            writeFile(answers);
        }
        else {
            // TODO: pass info to array, by using a construtor. So we end up with the array of Engineer constructors
            // console.log(engineerArray);
            promptEngineers(answers); // Recursion
        }
    })
}

const writeFile = function(answers) {
    // fs.readFile(__dirname + "/templates/main.html", function(err, data) {
    //     if (err) throw err;
    //     writeFileAsync(__dirname + "/output/team.html", data);
    // })
    // console.log(engineerArray);
    const html = generateHTML(answers);
    writeFileAsync(__dirname + "/output/team.html", html);
} 


function generateHTML(answers, engineer) {
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
                ${generateEngineerHTML(engineer)}
            </div>
        </div>
        
    </body>
</html>
    `
}

function generateEngineerHTML(engineerArray) {
    // _---------------engineerArray is undefined.  Find out why..----------------------------------------------------------
    console.log(engineerArray);

    let engHTML = ``;

    for(var en = 0; en < engineerArray.length; en++) {
        engHTML += engineerTemplate(engineerArray[en]);
    }

    return engHTML;
}

function engineerTemplate(engineer) {
    console.log(engineerArray);
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
            <p>Github:${Engineer.github}</p>
        </div>
        <div class="card-action">
            <a href="#">${engineer.email}</a>
        </div>
    </div>
</div>
    `
}







// For manager creation, and html skeleton creation
// buildTeam()
//     .then(function(answers) {
//         const html = generateHTML(answers);

//         return writeFileAsync("./output/index.html", html);
//     })
//     .then(function() {
//         console.log("Successfully created team cards!");
//     })
//     .catch(function(err) {
//         console.log(err);
// })
// Add .then() to prompt for employee creation (engineer or intern)
// WAIT.  .appendFile() will add new content to the end of the html file.  
// This means it will add it after the </html> tag...

// RETHINK THE WRITE FILE FUNCTION
