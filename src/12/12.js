(() => {
    const pressedKeys = [];
    const code = 'easteregg';

    window.addEventListener('keyup', (e) => {
        pressedKeys.push(e.key);

        if (pressedKeys.length > code.length) {
            pressedKeys.shift();
        }

        if (code === pressedKeys.join('')) {
            window.cornify_add();
        }
    });
})();
