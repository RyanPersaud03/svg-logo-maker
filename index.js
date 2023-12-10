const inquirer = require(`inquirer`);

const fs = require(`fs`);

// Import class from shapes.js
const {Circle, Square, Triangle } = require("./lib/shapes");

// Function writes the SVG file
function writeToFile(fileName, answers) {
    
    let svgString = "";
    // Sets Height and Width
    svgString =
      '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
    // <g> tag wraps <text> to group other SVG elements
    svgString += "<g>";
    // Reads input for shape choice
    svgString += `${answers.shape}`;

//  A Conditional check from users input 
// variable shapeChoice that is used to store an instance of the selected shape.
let shapeChoice;
if (answers.shape.includes("Triangle")) {
  shapeChoice = new Triangle();
  svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapecolor}"/>`;
} else if (answers.shape.includes("Square")) {
  shapeChoice = new Square();
  svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapecolor}"/>`;
} else if (answers.shape.includes("Circle")) {
  shapeChoice = new Circle();
  svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapecolor}"/>`;
} else {
  // Handle invalid shape choice
  console.log("Invalid shape selection.");
}

// text tag sets position, and gives font size of "40"
svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textcolor}">${answers.text}</text>`;
// Closing </g> tag
svgString += "</g>";
// Closing </svg> tag
svgString += "</svg>";

// Using file system module to generate svg file.
fs.writeFile(fileName, svgString, (err) => {
  err ? console.log(err) : console.log("Successful Generated logo.svg");
});
}



// Questions Prompts 
function promptUser() {
inquirer
.prompt([
    {
        type: `input`,
        name: `text`,
        message: "Enter your text here?(3 letter max)",
        validate: (input) => input.length <= 3,
    },
    {
        type: `input`,
        name: `textcolor`,
        message: "Enter text color"
    },
    {
        type: `checkbox`,
        name: `shape`,
        message: "Choose a shape",
        choices: [
            'Circle',
            'Triangle',
            'Square',
        ],
    },
    {
        type: `input`,
        name: `shapecolor`,
        message: "Choose a shape color"
    },
])
.then((answers) => {
    console.log(answers);
    if (answers.text.length > 3) {
        console.log(`Must enter 3 characters`);
        promptUser();
    } else {
        writeToFile("logo.svg", answers);
    }
});
}

promptUser();