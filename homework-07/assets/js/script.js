(function init() {
    const limitInput = document.getElementById('limit');
    const changeLimitButton = document.getElementById('change-limit');
    const getMetricsButton = document.getElementById('get-values');
    const filterSelect = document.getElementById('filter');
    const addAuthHeaderCheckbox = document.getElementById('add-auth-header');
    const logElement = document.getElementById('log');
    const sendBadApiRequestBtn = document.getElementById('bad-api');

    const credentials = btoa('Dmitry:Password');

    async function processResponse(response) {
        const json = await response.json();
        const elClass = response.status === 200 ? 'success' : 'error';
        logElement.innerHTML = `<pre class="${elClass}">${JSON.stringify(json, null, 2)}</pre>`;
    }

    function getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (addAuthHeaderCheckbox.checked) {
            headers.Authorization = `Basic ${credentials}`;
        }

        return headers;
    }

    changeLimitButton.addEventListener('click', () => {
        const newLimit = limitInput.value;

        fetch('/limit', {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify({ limit: newLimit }),
        }).then(processResponse);
    });

    getMetricsButton.addEventListener('click', () => {
        const filterValue = filterSelect.value;
        const filterSearchParam = filterValue === 'all' ? '' : `?filter=${filterValue}`;

        fetch(`/metrics${filterSearchParam}`, {
            headers: getHeaders(),
            method: 'GET',
        }).then(processResponse);
    });

    sendBadApiRequestBtn.addEventListener('click', () => {
        fetch('/bad-url', {
            method: 'POST',
        }).then(processResponse);
    });
})();
