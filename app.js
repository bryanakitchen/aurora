const GUEST = 'GUEST';

export function saveGuest(guest) {
    const stringyGuest = JSON.stringify(guest);
    localStorage.setItem(GUEST, stringyGuest);
}

export function getGuest() {
    const myKey = localStorage.getItem(GUEST);
    return JSON.parse(myKey);
}

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const guest = {
        name: data.get('name')
    };

    saveGuest(guest);

    window.location.href = './aurora/index.html';
});