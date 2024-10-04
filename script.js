// global variables
let gDisplayText = "";
let gFirstInputText = "";
let gSecondInputText = "";
let gOperationInputText = "";
let gLastResult = "";
let gLastSecondInputText = "";
let gLastOperationInputText = "";

// display
const display = document.querySelector(".display");
display.textContent = "0";

// buttons
const buttons = document.querySelectorAll("button");

buttons.forEach((button) =>
    button.addEventListener("click", handleAllButtonsClick)
);

function formatNumber(text) {
    let decimals = "";

    if (text.includes(".")) {
        const splitted = text.split(".");
        text = splitted[0];
        decimals = "." + splitted[1];
    }

    const numberOfCommas = parseInt((text.length - 1) / 3);
    let threeDigits = [];

    for (let i = 1; i <= numberOfCommas; i++) {
        threeDigits.unshift("," + text.slice(-3));
        text = text.slice(0, -3);
    }

    return `${text}${threeDigits.join("")}${decimals === "" ? "" : decimals}`;
}

function updateDisplay() {
    display.textContent = gDisplayText;
}

function inputNumber(buttonTextContext) {
    // get the first number if no operand
    if (gOperationInputText === "") {
        // period / dot logic
        if (buttonTextContext === ".") {
            if (gFirstInputText === "") {
                gFirstInputText += "0.";
            } else if (!gFirstInputText.includes(".")) {
                gFirstInputText += ".";
            }
            // non-period
        } else {
            // tricky nested if statement to limit 2 digits
            if (gFirstInputText.includes(".")) {
                if (gFirstInputText.split(".")[1].length < 2) {
                    gFirstInputText += buttonTextContext;
                }
            } else {
                gFirstInputText += buttonTextContext;
            }
        }
        gDisplayText = formatNumber(gFirstInputText);
        // get the second number if there's an operand
    } else {
        // period / dot logic
        if (buttonTextContext === ".") {
            if (gSecondInputText === "") {
                gSecondInputText += "0.";
            } else if (!gSecondInputText.includes(".")) {
                gSecondInputText += ".";
            }
            // non-period
        } else {
            // tricky same as above
            if (gSecondInputText.includes(".")) {
                if (gSecondInputText.split(".")[1].length < 2) {
                    gSecondInputText += buttonTextContext;
                }
            } else {
                gSecondInputText += buttonTextContext;
            }
        }
        gDisplayText = `${formatNumber(
            gFirstInputText
        )} ${gOperationInputText} ${formatNumber(gSecondInputText)}`;
    }
    updateDisplay();
}

function inputOperation(buttonTextContext) {
    gLastSecondInputText = "";
    gLastOperationInputText = "";
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
    gDisplayText = `${formatNumber(gFirstInputText)} ${gOperationInputText} `;
    updateDisplay();
}

function clearAll() {
    gFirstInputText = "";
    gSecondInputText = "";
    gOperationInputText = "";
    gLastResult = "";
    gLastSecondInputText = "";
    gLastOperationInputText = "";
    gDisplayText = "";
    display.textContent = "0";
}

function clearEntry() {
    if (gOperationInputText !== "") {
        gSecondInputText = "";
        gDisplayText = `${formatNumber(
            gFirstInputText
        )} ${gOperationInputText} `;
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
        gDisplayText = formatNumber(gFirstInputText);
        updateDisplay();
        // second number
    } else if (
        gFirstInputText !== "" &&
        gOperationInputText !== "" &&
        gSecondInputText !== ""
    ) {
        gSecondInputText = negate(gSecondInputText);
        gDisplayText = `${formatNumber(
            gFirstInputText
        )} ${gOperationInputText} ${formatNumber(gSecondInputText)}`;
        updateDisplay();
        // result
    } else if (gFirstInputText === "" && gLastResult !== "") {
        gLastResult = negate(gLastResult);
        display.textContent = gLastResult;
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
        gDisplayText =
            gFirstInputText === "" ? "0" : formatNumber(gFirstInputText);
        updateDisplay();
        // second number
    } else if (
        gFirstInputText !== "" &&
        gOperationInputText !== "" &&
        gSecondInputText !== ""
    ) {
        gSecondInputText = gSecondInputText.slice(0, -1);
        gDisplayText = `${formatNumber(
            gFirstInputText
        )} ${gOperationInputText} ${formatNumber(gSecondInputText)}`;
        updateDisplay();
        // result
    } else if (gFirstInputText === "" && gLastResult !== "") {
        gLastResult = gLastResult.slice(0, -1);
        gDisplayText = gLastResult === "" ? "0" : formatNumber(gLastResult);
        updateDisplay();
    }
}

function operate() {
    if (gLastOperationInputText !== "" && gLastSecondInputText !== "") {
        gFirstInputText = gLastResult;
        gSecondInputText = gLastSecondInputText;
        gOperationInputText = gLastOperationInputText;
    }

    if (!gFirstInputText || !gOperationInputText || !gSecondInputText) {
        return;
    }

    const trimTrailingZeros = (text) => {
        if (text[text.length - 1] === "0") {
            text = text.slice(0, text.length - 1);
        }
        if (text[text.length - 1] === "0") {
            text = text.slice(0, text.length - 1);
        }
        if (text[text.length - 1] === ".") {
            text = text.slice(0, text.length - 1);
        }
        return text;
    };

    const a = parseFloat(gFirstInputText);
    const b = parseFloat(gSecondInputText);

    switch (gOperationInputText) {
        case "+":
            gLastResult = trimTrailingZeros((a + b).toFixed(2).toString());
            gDisplayText = formatNumber(gLastResult);
            updateDisplay();
            break;
        case "–":
            gLastResult = trimTrailingZeros((a - b).toFixed(2).toString());
            gDisplayText = formatNumber(gLastResult);
            updateDisplay();
            break;
        case "×":
            gLastResult = trimTrailingZeros((a * b).toFixed(2).toString());
            gDisplayText = formatNumber(gLastResult);
            updateDisplay();
            break;
        case "÷":
            if (b === 0.0) {
                gDisplayText = "error / 0";
            } else {
                gLastResult = trimTrailingZeros((a / b).toFixed(2).toString());
                gDisplayText = formatNumber(gLastResult);
            }
            updateDisplay();
            break;
        default:
            break;
    }

    gLastSecondInputText = gSecondInputText;
    gLastOperationInputText = gOperationInputText;
    gFirstInputText = "";
    gSecondInputText = "";
    gOperationInputText = "";
    gDisplayText = "";
}

function handleAllButtonsClick(e) {
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
        case ".":
            inputNumber(e.target.textContent);
            break;
        case "+":
        case "–":
        case "×":
        case "÷":
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
