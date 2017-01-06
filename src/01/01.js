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

        keyCodeItem.audio = audio;

        audio.addEventListener('play', () => {
            keyCodeItem.element.classList.add('playing')
        });

        audio.addEventListener('ended', () => {
            keyCodeItem.element.classList.remove('playing')
        });
    });

    document.addEventListener('keydown', (e) => {
        if (typeof keyCodeMap[e.keyCode] !== 'undefined') {
            keyCodeMap[e.keyCode].audio.currentTime = 0;
            keyCodeMap[e.keyCode].audio.play();
        }
    });
})();
