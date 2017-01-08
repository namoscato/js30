(() => {
    function createClockHand(element, intervalSeconds, getTransformationPercentage) {
        function transform() {
            this.element.style.transform = `rotate(${(360 * getTransformationPercentage(new Date())) + 90}deg)`;
        }

        this.element = element;

        transform();

        setInterval(() => transform(), intervalSeconds * 1000);
    }

    createClockHand(document.querySelector('.hour-hand'), 3600, date => (date.getHours() % 12) / 12);
    createClockHand(document.querySelector('.min-hand'), 60, date => (date.getMinutes() % 60) / 60);
    createClockHand(document.querySelector('.second-hand'), 1, date => (date.getSeconds() % 60) / 60);
})();
