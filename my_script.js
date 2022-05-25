// ==UserScript==
// @name         Sudoku.com Hotkeys
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Keyboard shortcuts for sudoku.com
// @author       Jesse Connell
// @match        https://sudoku.com/*
// @icon         https://www.google.com/s2/favicons?domain=sudoku.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Mask space bar scrolling:
    window.addEventListener('keydown', (e) => {
        if ([13, 32].includes(e.keyCode) && e.target === document.body) {
            e.preventDefault();
        }
    });

    var pencilButton = document.querySelector("#game-controls > div:nth-child(3) > div.game-controls-item.game-controls-pencil");
    var undoButton = document.querySelector("#game-controls > div:nth-child(1) > div.game-controls-item.game-controls-undo")

    var doClick = function(b) {
        var ev = document.createEvent('Events');
        ev.initEvent('mousedown', true, true);
        b.dispatchEvent(ev);
    };

    var multiKey = function(e) {
        e.target.dispatchEvent(e);
//        document.dispatchEvent(e);
    }

    var onKeyDown = function(e) {
        console.info(e);

        if (e.code == "Space" || e.code == "NumpadEnter")
        {
            doClick(pencilButton);
        }
        if (e.code == "NumpadSubtract")
        {
            doClick(undoButton);
        }
        if (e.ctrlKey && ["ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"].includes(e.code))
        {
            console.log(`Arrow: ${e.code} pressed`);
            multiKey(e);
        }
    };

    document.addEventListener("keydown", onKeyDown);
})();
