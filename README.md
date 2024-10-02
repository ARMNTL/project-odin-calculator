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
            <div class="display">
                -12345678.90
            </div>
            <div class="buttons">
                <div class="buttons-row-1">
                    <button class="button-clear-entry">CE</button>
                    <button class="button-clear">C</button>
                    <button class="button-back">←</button>
                    <button class="button-divided">%</button>
                </div>
                <div class="buttons-row-2">
                    <button class="button-seven">7</button>
                    <button class="button-eight">8</button>
                    <button class="button-nine">9</button>
                    <button class="button-times">X</button>
                </div>
                <div class="buttons-row-3">
                    <button class="button-four">4</button>
                    <button class="button-five">5</button>
                    <button class="button-six">6</button>
                    <button class="button-minus">-</button>
                </div>
                <div class="buttons-row-4">
                    <button class="button-one">1</button>
                    <button class="button-two">2</button>
                    <button class="button-three">3</button>
                    <button class="button-plus">+</button>
                </div>
                <div class="buttons-row-5"></div>
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
