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
        writeFile(answers);
    })
}

buildTeam();

let i = 0;

function promptEngineers(answers) {
    i++;
    inquirer.prompt([
        {
            type: "input",
            name: "engName",
            message: `What is the #${i} engineer's name?`
        }
    ]).then(function(engineers) {
        console.log(engineers.engName);
        if (i >= answers.engAmount) {
            console.log("End of prompt.......");
        }
        else {
        promptEngineers(answers); // Recursion
        }
    })
}

const writeFile = function(answers) {
    // fs.readFile(__dirname + "/templates/main.html", function(err, data) {
    //     if (err) throw err;
    //     writeFileAsync(__dirname + "/output/team.html", data);
    // })
    const html = generateHTML(answers);
    writeFileAsync(__dirname + "/output/team.html", html);
} 
function generateHTML(answers) {
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
                
            </div>
        </div>
        
    </body>
</html>
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
