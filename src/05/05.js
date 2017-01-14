(() => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const photoCount = 5;
    const panelsElement = document.querySelector('.panels');

    function padNumber(number) {
        return number < 10 ? `0${number}` : number;
    }

    window.fetch('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=aedcef5450e7551a3340723740b04c9a&format=json&nojsoncallback=1&photoset_id=72157678586797385&user_id=91374488%40N07&extras=url_m,date_taken')
        .then(response => response.json())
        .then((response) => {
            const photoIdIndexMap = {};
            const photos = response.photoset.photo;

            photos.forEach((photo, i) => {
                photoIdIndexMap[photo.id] = i + 1;
            });

            for (let i = 0; i < photoCount; i += 1) {
                const element = document.createElement('div');
                const photo = photos.splice(Math.floor(Math.random() * photos.length), 1).pop();

                const date = new Date(photo.datetaken);

                element.classList.add('panel');
                element.style.backgroundImage = `url(${photo.url_m}`;
                element.innerHTML = `<div class="panel-text">${monthNames[date.getMonth()]} ${date.getDate()}</div>` +
                    `<div class="panel-number">${padNumber(photoIdIndexMap[photo.id])}</div>` +
                    `<div class="panel-text">${photo.title}</div>`;

                element.addEventListener('click', () => element.classList.toggle('is-active'));

                panelsElement.appendChild(element);
            }
        });
})();
