const GUEST = 'GUEST';

export function saveGuest(guest) {
    const stringyGuest = JSON.stringify(guest);
    localStorage.setItem(GUEST, stringyGuest);
}

// export function setInLocalStorage(key, value) {
//     const stringyItem = JSON.stringify(value);

//     localStorage.setItem(key, stringyItem);

//     return stringyItem;
// }

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
        // notes: {};
    };

    saveGuest(guest);

    window.location.href = './aurora/index.html';
});