(() => {
    const bodyElement = document.querySelector('html');
    const days = 30;
    const iframeColumns = 3;
    const previewsElement = document.getElementById('previews');
    const rotatePercent = 0.0025;

    const bodyHeight = `${(window.innerHeight / 3) * Math.ceil((days - 1) / iframeColumns)}px`;

    previewsElement.style.setProperty('--scale', 1 / 3);
    previewsElement.style.setProperty('height', bodyHeight);
    bodyElement.style.setProperty('height', bodyHeight);

    function padNumber(number) {
        return (number < 10 ? '0' : '') + number;
    }

    function getStyleAttributeValue(styles) {
        let result = '';

        Object.keys(styles).forEach((property) => {
            result += `${property}: ${styles[property]};`;
        });

        return result;
    }

    let html = '';

    for (let i = 0; i < days; i += 1) {
        const href = `${padNumber(i + 1)}/index.html`;
        const hyperlinkStyle = getStyleAttributeValue({
            width: `${window.innerWidth}px`,
            height: `${window.innerHeight}px`,
            left: `${(window.innerWidth / 3) * (i % iframeColumns)}px`,
            top: `${(window.innerHeight / 3) * Math.floor(i / iframeColumns)}px`,
        });
        const iframeStyle = getStyleAttributeValue({
            width: `${window.innerWidth}px`,
            height: `${window.innerHeight}px`,
        });

        html += `<a href="${href}" style="${hyperlinkStyle}"><iframe src="${href}" style="${iframeStyle}"></iframe></a>`;
    }

    document.onmousemove = (e) => {
        previewsElement.style.setProperty('--rotateY', `${((e.clientX - (window.innerWidth / 2)) / (window.innerWidth / 2)) * (window.innerWidth * rotatePercent)}deg`);
        previewsElement.style.setProperty('--rotateX', `${(((window.innerHeight / 2) - e.clientY) / (window.innerHeight / 2)) * (window.innerHeight * rotatePercent)}deg`);
    };

    previewsElement.innerHTML = html;
})();
