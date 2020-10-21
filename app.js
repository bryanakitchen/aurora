const GUEST = 'GUEST';

export function setInLocalStorage(key, value) {
    const stringyItem = JSON.stringify(value);
    localStorage.setItem(key, stringyItem);
}

export function getLocalStorage() {
    const myKey = localStorage.getItem(GUEST);
    return JSON.parse(myKey);
}

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const guest = {
        name: data.get('name')
        // notes: []
    };

    setInLocalStorage('GUEST', guest);

    window.location.href = './aurora/index.html';
});