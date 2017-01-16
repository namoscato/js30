(() => {
    const searchInputElement = document.getElementById('search');
    const searchLabelIpElement = document.getElementById('search-label-ip');
    const suggestionsElement = document.querySelector('.suggestions');

    searchInputElement.focus();

    window.fetch('http://jsonip.com')
        .then(response => response.json())
        .then((response) => {
            searchLabelIpElement.innerText = response.ip;
        });

    window.fetch('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json')
        .then(response => response.json())
        .then((response) => {
            const cities = response.map((item) => {
                const label = `${item.city}, ${item.state}`;

                return {
                    label,
                    population: Number(item.population).toLocaleString(),
                    value: label.toLowerCase(),
                };
            });

            searchInputElement.addEventListener('input', () => {
                const searchInput = searchInputElement.value;
                const regularExpression = new RegExp(`${searchInput}`, 'gi');
                const searchValue = searchInput.toLowerCase();
                let html = '';

                cities.forEach((city) => {
                    const index = city.value.indexOf(searchValue);

                    if (index < 0) {
                        return;
                    }

                    html += '<li>';
                    html += `<span class="population">${city.population}</span>`;
                    html += city.label.replace(regularExpression, `<span class="highlight">${searchInput}</span>`);
                    html += '</li>';
                });

                suggestionsElement.innerHTML = html;
            });
        });
})();
