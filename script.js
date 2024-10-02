// global variables
let gDisplayText = "";
let gFirstInputText = "";
let gSecondInputText = "";
let gOperationInputText = "";

// display
const display = document.querySelector(".display");
display.textContent = "0";

// buttons
const buttons = document.querySelectorAll("button");

buttons.forEach((button) =>
    button.addEventListener("click", handleAllButtonsClick)
);

function processNumbersButtonClick(buttonTextContext) {
    if (gOperationInputText === "") {
        gFirstInputText += buttonTextContext;
        gDisplayText = gFirstInputText;
    } else if (gOperationInputText !== "") {
        gSecondInputText += buttonTextContext;
        gDisplayText += buttonTextContext;
    }

    updateDisplay();
}

function processOperationButtonClick(buttonTextContext) {
    if (gFirstInputText === "") {
        return;
    }

    gOperationInputText = buttonTextContext;
    gDisplayText = `${gFirstInputText} ${gOperationInputText} `;
    updateDisplay();
}

function updateDisplay() {
    display.textContent = gDisplayText;
}

function handleAllButtonsClick(e) {
    // console.log(`${e.target.textContent} got clicked!`);

    switch (e.target.textContent) {
        case "0":
            if (display.textContent === "0") break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            console.log(`${e.target.textContent} clicked`);
            processNumbersButtonClick(e.target.textContent);
            break;
        case "+":
        case "–":
        case "×":
        case "÷":
            console.log(`${e.target.textContent} clicked`);
            processOperationButtonClick(e.target.textContent);
            break;
        default:
            break;
    }
}
