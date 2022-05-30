// ==UserScript==
// @name         Sudoku.com Hotkeys
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Custom keyboard shortcuts for sudoku.com
// @author       Jesse Connell
// @match        https://sudoku.com/*
// @icon         https://www.google.com/s2/favicons?domain=sudoku.com
// @downloadURL  https://raw.githubusercontent.com/jesseconnell/sudoku_hotkeys/main/my_script.js
// @updateURL    https://raw.githubusercontent.com/jesseconnell/sudoku_hotkeys/main/my_script.js
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    // Mask space bar scrolling:
    window.addEventListener('keydown', (e) => {
        console.info(e);
        if ([13, 32].includes(e.keyCode) && e.target === document.body)
        {
            e.preventDefault();
            console.log('muted')
        }
    });

    var pencilButton = document.querySelector("#game-controls > div:nth-child(3) > div.game-controls-item.game-controls-pencil");
    var undoButton = document.querySelector("#game-controls > div:nth-child(1) > div.game-controls-item.game-controls-undo")

    var doClick = function(b) {
        var ev = document.createEvent('Events');
        ev.initEvent('mousedown', true, true);
        b.dispatchEvent(ev);
    };

    var onKeyDown = function(e) {

        console.info(e);
        document.copies.push(e);


        if (e.code == "Space" || e.code == "NumpadEnter")
        {
            doClick(pencilButton);
        }
        if (e.code == "NumpadSubtract")
        {
            doClick(undoButton);
        }
        if (["ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"].includes(e.code))
        {
            //console.log(`Arrow: ${e.code} pressed`);
            if (e.ctrlKey)
            {
                var eCopy = new e.constructor(e.type, e);
                if (e.repeatCount)
                {
                    eCopy.repeatCount = e.repeatCount-1;
                }
                else
                {
                    eCopy.repeatCount = 7
                }
                document.dispatchEvent(eCopy);
            }
        }
    };
    document.copies=[]

    document.addEventListener("keydown", onKeyDown);
})();