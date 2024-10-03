// global variables
let gDisplayText = "";
let gFirstInputText = "";
let gSecondInputText = "";
let gOperationInputText = "";
let gLastResult = "";

// display
const display = document.querySelector(".display");
display.textContent = "0";

// buttons
const buttons = document.querySelectorAll("button");

buttons.forEach((button) =>
    button.addEventListener("click", handleAllButtonsClick)
);

function processNumbersButtonClick(buttonTextContext) {
    // get the first number
    if (gOperationInputText === "") {
        gFirstInputText += buttonTextContext;
        gDisplayText = gFirstInputText;
        // get the second number
    } else if (gOperationInputText !== "") {
        gSecondInputText += buttonTextContext;
        gDisplayText += buttonTextContext;
    }
    updateDisplay();
}

function processOperationButtonClick(buttonTextContext) {
    // right after =
    if (gLastResult !== "") {
        gFirstInputText = gLastResult;
    }

    // starting with operation
    if (gFirstInputText === "") {
        return;
    }

    // clicking an operation instead of =
    if (gFirstInputText !== "" && gSecondInputText !== "") {
        processComputeButtonClick();
        gFirstInputText = gLastResult;
    }

    gOperationInputText = buttonTextContext;
    gDisplayText = `${gFirstInputText} ${gOperationInputText} `;
    updateDisplay();
}

function updateDisplay() {
    console.log(
        gFirstInputText,
        gOperationInputText,
        gSecondInputText,
        gLastResult
    );
    display.textContent = gDisplayText;
}

function clearAll() {
    gFirstInputText = "";
    gSecondInputText = "";
    gOperationInputText = "";
    gLastResult = "";
    gDisplayText = "";
    display.textContent = "0";
}

function processComputeButtonClick() {
    if (!gFirstInputText || !gOperationInputText || !gSecondInputText) {
        // console.log("Not possible");
        return;
    }

    // only integers for now
    const a = parseInt(gFirstInputText);
    const b = parseInt(gSecondInputText);

    switch (gOperationInputText) {
        case "+":
            gLastResult = (a + b).toString();
            gDisplayText = gLastResult;
            updateDisplay();
            break;
        case "–":
            gLastResult = (a - b).toString();
            gDisplayText = gLastResult;
            updateDisplay();
            break;
        case "×":
            gLastResult = (a * b).toString();
            gDisplayText = gLastResult;
            updateDisplay();
            break;
        case "÷":
            gLastResult = (a / b).toString();
            gDisplayText = gLastResult;
            updateDisplay();
            break;
        default:
            break;
    }

    gFirstInputText = "";
    gSecondInputText = "";
    gOperationInputText = "";
    gDisplayText = "";
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
            // console.log(`${e.target.textContent} clicked`);
            processNumbersButtonClick(e.target.textContent);
            break;
        case "+":
        case "–":
        case "×":
        case "÷":
            // console.log(`${e.target.textContent} clicked`);
            processOperationButtonClick(e.target.textContent);
            break;
        case "=":
            processComputeButtonClick();
            break;
        case "C":
            clearAll();
            break;
        default:
            break;
    }
}
