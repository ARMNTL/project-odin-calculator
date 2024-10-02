# Project Odin Calculator

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

2. Some CSS to make it look better.

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
    /* border: 1px solid pink; */

    display: flex;
    justify-content: end;
    align-items: end;
    min-width: 212px;
    min-height: 50px;
    font-size: 1.5em;
    flex: 1 auto;
}

.container-buttons {
    /* border: 1px solid blue; */

    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1 auto;
}

.buttons-row {
    /* border: 1px solid brown; */

    display: flex;
    justify-content: center;
    align-items: stretch;
    gap: 4px;
    flex: 1 auto;
}

button {
    /* min-width: 50px; */
    /* min-height: 50px; */
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
