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

function inputNumber(buttonTextContext) {
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

function inputOperation(buttonTextContext) {
    // right after =
    if (
        gLastResult !== "" &&
        gSecondInputText === "" &&
        gFirstInputText === ""
    ) {
        gFirstInputText = gLastResult;
    }

    // starting with operation
    if (gFirstInputText === "") {
        return;
    }

    // clicking an operation instead of =
    if (gFirstInputText !== "" && gSecondInputText !== "") {
        operate();
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

function clearEntry() {
    if (gOperationInputText !== "") {
        gSecondInputText = "";
        gDisplayText = `${gFirstInputText} ${gOperationInputText} `;
        updateDisplay();
    } else {
        clearAll();
    }
}

function negateNumber() {
    const negate = (text) => (text[0] === "-" ? text.slice(1) : `-${text}`);

    // first number
    if (
        gFirstInputText !== "" &&
        gOperationInputText === "" &&
        gSecondInputText === ""
    ) {
        gFirstInputText = negate(gFirstInputText);
        gDisplayText = gFirstInputText;
        updateDisplay();
        // second number
    } else if (
        gFirstInputText !== "" &&
        gOperationInputText !== "" &&
        gSecondInputText !== ""
    ) {
        gSecondInputText = negate(gSecondInputText);
        gDisplayText = `${gFirstInputText} ${gOperationInputText} ${gSecondInputText}`;
        updateDisplay();
        // result
    } else if (gFirstInputText === "" && gLastResult !== "") {
        gLastResult = negate(gLastResult);
        gDisplayText = gLastResult;
        updateDisplay();
    }
}

function backSpace() {
    // first number
    if (
        gFirstInputText !== "" &&
        gOperationInputText === "" &&
        gSecondInputText === ""
    ) {
        gFirstInputText = gFirstInputText.slice(0, -1);
        gDisplayText = gFirstInputText === "" ? "0" : gFirstInputText;
        updateDisplay();
        // second number
    } else if (
        gFirstInputText !== "" &&
        gOperationInputText !== "" &&
        gSecondInputText !== ""
    ) {
        gSecondInputText = gSecondInputText.slice(0, -1);
        gDisplayText = `${gFirstInputText} ${gOperationInputText} ${gSecondInputText}`;
        updateDisplay();
        // result
    } else if (gFirstInputText === "" && gLastResult !== "") {
        gLastResult = gLastResult.slice(0, -1);
        gDisplayText = gLastResult === "" ? "0" : gLastResult;
        updateDisplay();
    }
}

function operate() {
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
            inputNumber(e.target.textContent);
            break;
        case "+":
        case "–":
        case "×":
        case "÷":
            // console.log(`${e.target.textContent} clicked`);
            inputOperation(e.target.textContent);
            break;
        case "=":
            operate();
            break;
        case "C":
            clearAll();
            break;
        case "CE":
            clearEntry();
            break;
        case "±":
            negateNumber();
            break;
        case "←":
            backSpace();
            break;
        default:
            break;
    }
}
