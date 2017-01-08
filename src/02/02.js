(() => {
    const clockHands = [
        {
            element: document.querySelector('.hour-hand'),
            getTransformationPercentage: date => (date.getHours() % 12) / 12,
        },
        {
            element: document.querySelector('.min-hand'),
            getTransformationPercentage: date => (date.getMinutes() % 60) / 60,
        },
        {
            element: document.querySelector('.second-hand'),
            getTransformationPercentage: date => (date.getSeconds() % 60) / 60,
        },
    ];

    function setTime() {
        clockHands.forEach((hand) => {
            // eslint-disable-next-line no-param-reassign
            hand.element.style.transform = `rotate(${(360 * hand.getTransformationPercentage(new Date())) + 90}deg)`;
        });
    }

    setTime();

    setInterval(setTime, 1000);
})();
