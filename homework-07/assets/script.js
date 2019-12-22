(function init() {
    const limitInput = document.getElementById('limit');
    const changeLimitButton = document.getElementById('change-limit');
    const getMetricsButton = document.getElementById('get-values');
    const filterSelect = document.getElementById('filter');
    const addAuthHeaderCheckbox = document.getElementById('add-auth-header');
    const logElement = document.getElementById('log');
    const sendBadApiRequestBtn = document.getElementById('bad-api');

    const credentials = btoa('Dmitry | My secret password');

    async function processResponse(response) {
        const json = await response.json();
        const elClass = response.status === 200 ? 'success' : 'error';
        logElement.innerHTML = `<pre class="${elClass}">${JSON.stringify(json, null, 2)}</pre>`;
    }

    function getHeaders() {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        if (addAuthHeaderCheckbox.checked) {
            headers.Authorization = `Basic ${credentials}`;
        }

        return headers;
    }

    changeLimitButton.addEventListener('click', () => {
        const newLimit = limitInput.value;
        const headers = getHeaders();

        fetch('/limit', {
            headers,
            method: 'POST',
            body: JSON.stringify({ limit: newLimit }),
        }).then(processResponse);
    });

    getMetricsButton.addEventListener('click', () => {
        const filterValue = filterSelect.value;
        const filterSearchParam = filterValue === 'all' ? '' : `?filter=${filterValue}`;
        const headers = getHeaders();

        fetch(`/metrics${filterSearchParam}`, {
            headers,
            method: 'GET',
        }).then(processResponse);
    });

    sendBadApiRequestBtn.addEventListener('click', () => {
        fetch('/bad-url', {
            method: 'POST',
        }).then(processResponse);
    });
})();
