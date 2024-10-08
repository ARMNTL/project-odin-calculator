# Project Odin Calculator

## Questions I made during development

-   Can I do this without using global variables?
-   How can I insert unicode characters? The true minus sign. (Unicode 2212)

## Steps I made

1. Making the calculator skeleton on html. By the way, it's inpired by Microsoft Windows 11 Calculator in **Keep on top** mode.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Project Odin Calculator</title>
        <link rel="stylesheet" href="./style.css" />
        <script src="./script.js" defer></script>
    </head>
    <body>
        <div class="container-calculator">
            <div class="display">-12345678.90</div>
            <div class="container-buttons">
                <div class="buttons-row">
                    <button class="button-clear-entry">CE</button>
                    <button class="button-clear">C</button>
                    <button class="button-back">←</button>
                    <button class="button-divided">%</button>
                </div>
                <div class="buttons-row">
                    <button class="button-seven">7</button>
                    <button class="button-eight">8</button>
                    <button class="button-nine">9</button>
                    <button class="button-times">X</button>
                </div>
                <div class="buttons-row">
                    <button class="button-four">4</button>
                    <button class="button-five">5</button>
                    <button class="button-six">6</button>
                    <button class="button-minus">-</button>
                </div>
                <div class="buttons-row">
                    <button class="button-one">1</button>
                    <button class="button-two">2</button>
                    <button class="button-three">3</button>
                    <button class="button-plus">+</button>
                </div>
                <div class="buttons-row">
                    <button class="button-negate">±</button>
                    <button class="button-zero">0</button>
                    <button class="button-point">.</button>
                    <button class="button-equals">=</button>
                </div>
            </div>
        </div>
    </body>
</html>
```

2. Some CSS to make it look better. For the colors, I used the **VS Color Picker** extension.

```css
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap");

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container-calculator {
    border: 1px solid grey;
    border-radius: 8px;
    box-shadow: 2px 2px 2px grey;
    padding: 4px;
    font-family: "Noto Sans", sans-serif;
    font-weight: 500;
    background-color: #f3f3f3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    min-width: 40%;
    min-height: 60%;
}

.display {
    display: flex;
    justify-content: end;
    align-items: end;
    min-width: 212px;
    min-height: 50px;
    font-size: 1.5em;
    flex: 1 auto;
}

.container-buttons {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1 auto;
}

.buttons-row {
    display: flex;
    justify-content: center;
    align-items: stretch;
    gap: 4px;
    flex: 1 auto;
}

button {
    background-color: #f6f6f6;
    border-radius: 4px;
    flex: 1;
}

button:hover {
    background-color: white;
}

.button-equals {
    color: white;
    background-color: #1975c5;
}

.button-equals:hover {
    background-color: #3082ca;
}
```

3. Let's test the display.

```js
const display = document.querySelector(".display");
display.textContent = "Testing 123";
```

4. Adding event listeners for all buttons.

```js
const buttons = document.querySelectorAll("button");

buttons.forEach((button) =>
    button.addEventListener("click", handleAllButtonsClick)
);

function handleAllButtonsClick(e) {
    console.log(`${e.target.textContent} got clicked!`);
}
```

5. Handle number button clicks.

```js
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
            break;
        default:
            break;
    }
}
```

6. Declare global variables. (On top of the code)

```js
// global variables
let gDisplayText = "";
let gFirstInputText = "";
let gSecondInputText = "";
let gOperationInputText = "";
```

7. Handle number buttons to get the first number.

```js
function processNumbersButtonClick(buttonTextContext) {
    if (gOperationInputText === "") {
        gFirstInputText += buttonTextContext;
    }
    gDisplayText = gFirstInputText;
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
        default:
            break;
    }
}
```

8. Handle operation buttons. I changed the minus symbol to alt + 0151; the multiplication symbol to alt + 0215; and division symbol to alt + 0247.

```js
function processOperationButtonClick(buttonTextContext) {
    if (gFirstInputText === "") {
        return;
    }

    gOperationInputText = buttonTextContext;
    gDisplayText = `${gFirstInputText} ${gOperationInputText} `;
    updateDisplay();
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
```

9. Get the second number.

```js
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
```

10. Let's get the equal button to work!

```js
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
            gDisplayText = (a + b).toString();
            updateDisplay();
            break;
        case "–":
            gDisplayText = (a - b).toString();
            updateDisplay();
            break;
        case "×":
            gDisplayText = (a * b).toString();
            updateDisplay();
            break;
        case "÷":
            gDisplayText = (a / b).toString();
            updateDisplay();
            break;
        default:
            break;
    }
}
```

11. Right now, it works only the first time. If we try a second calculation, it gets weird. Let's fix it!

```js
function processComputeButtonClick() {
    ...
    gFirstInputText = "";
    gSecondInputText = "";
    gOperationInputText = "";
    gDisplayText = "";
}
```

12. Another thing that other calculator allows you to do, is that you can use the result to do additional operations. Clicking an operation right after clicking the equals button.

```js
function processOperationButtonClick(buttonTextContext) {
    if (gLastResult !== "") {
        gFirstInputText = gLastResult;
    }

    if (gFirstInputText === "") {
        return;
    }

    gOperationInputText = buttonTextContext;
    gDisplayText = `${gFirstInputText} ${gOperationInputText} `;
    updateDisplay();
}
```

13. Also, be able to chain operations, for example, 1 + 1 + 2 + 3 = 7.

```js
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
```

14. I should have done C (clear) button earlier...

```js
function clearAll() {
    gFirstInputText = "";
    gSecondInputText = "";
    gOperationInputText = "";
    gLastResult = "";
    gDisplayText = "";
    display.textContent = "0";
}
```

15. Also the CE (clear entry?) button.

```js
function clearEntry() {
    if (gOperationInputText !== "") {
        gSecondInputText = "";
        gDisplayText = `${gFirstInputText} ${gOperationInputText} `;
        updateDisplay();
    } else {
        clearAll();
    }
}
```

16. The negate button looks easy to code. Not quite.

```js
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
```

17. The back (backspace / erase) button seems similar to the `negateNumber` function.

```js
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
```

18. Let's work on the period / dot button. I updated `inputNumber` function.

```js
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
            gDisplayText += gFirstInputText;
            // non-period
        } else {
            gFirstInputText += buttonTextContext;
        }
        gDisplayText = gFirstInputText;
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
            gSecondInputText += buttonTextContext;
        }
        gDisplayText = `${gFirstInputText} ${gOperationInputText} ${gSecondInputText}`;
    }
    updateDisplay();
}
```

19. Limit decimals to two digits. Updated `inputNumber` function again.

```js
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
        gDisplayText = gFirstInputText;
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
        gDisplayText = `${gFirstInputText} ${gOperationInputText} ${gSecondInputText}`;
    }
    updateDisplay();
}
```

20. Update `operate` function to display decimals. Also, handle division by zero.

```js
function operate() {
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
            gDisplayText = gLastResult;
            updateDisplay();
            break;
        case "–":
            gLastResult = trimTrailingZeros((a - b).toFixed(2).toString());
            gDisplayText = gLastResult;
            updateDisplay();
            break;
        case "×":
            gLastResult = trimTrailingZeros((a * b).toFixed(2).toString());
            gDisplayText = gLastResult;
            updateDisplay();
            break;
        case "÷":
            if (b === 0.0) {
                gDisplayText = "error / 0";
            } else {
                gLastResult = trimTrailingZeros((a / b).toFixed(2).toString());
                gDisplayText = gLastResult;
            }
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
```

21. Just for completion's sake! Let' add the compute repeatedly features. I.e. clicking the = button consecutively. I ended up with the following. I'm pretty sure it can be refactored, but I spent too much time on this one. It was fun! P.S.: I couldn't help it! I had to format the numbers!

```js
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
```
