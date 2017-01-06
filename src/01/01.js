(() => {
    const audioElements = Array.prototype.slice.call(document.getElementsByTagName('audio'));
    const keyCodeMap = {};
    const keyElements = Array.prototype.slice.call(document.getElementsByClassName('key'));

    keyElements.forEach((key) => {
        keyCodeMap[key.dataset.key] = {
            element: key,
        };
    });

    audioElements.forEach((audio) => {
        const keyCodeItem = keyCodeMap[audio.dataset.key];

        keyCodeItem.audio = new Audio(audio.src);

        keyCodeItem.audio.addEventListener('play', () => {
            keyCodeItem.element.className = 'key playing';
        });

        keyCodeItem.audio.addEventListener('ended', () => {
            keyCodeItem.element.className = 'key';
        });
    });

    document.addEventListener('keydown', (e) => {
        if (typeof keyCodeMap[e.keyCode] !== 'undefined') {
            keyCodeMap[e.keyCode].audio.play();
        }
    });
})();
