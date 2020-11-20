//An array of Pitches
export const pitchObject = {
    'C3': 130.81,
    'Cs3': 138.59,
    'D3': 146.83,
    'Ds3': 155.56,
    'E3': 164.81,
    'F3': 174.61,
    'Fs3': 185.00,
    'G3': 196.00,
    'Gs3': 207.65,
    'A3': 220.00,
    'As3': 233.08,
    'B3': 246.94,
    'C4': 261.63,
};

export const notesData = [
    {
        id: 'C3',
        note: 'C',
    },
    {
        id: 'Cs3',
        note: 'C#',
    },
    {
        id: 'D3',
        note: 'D',
    },
    {
        id: 'Ds3',
        note: 'D#',
    },
    {
        id: 'E3',
        note: 'E',
    },
    {
        id: 'F3',
        note: 'F',
    },
    {
        id: 'Fs3',
        note: 'F#',
    },
    {
        id: 'G3',
        note: 'G',
    },
    {
        id: 'Gs3',
        note: 'G#',
    },
    {
        id: 'A3',
        note: 'A',
    },
    {
        id: 'As3',
        note: 'A#',
    },
    {
        id: 'B3',
        note: 'B',
    },
    {
        id: 'C4',
        note: 'High C',
    },
];

export function findById(someArray, someId) {
    for (let i = 0; i < someArray.length; i++) {
        const item = someArray[i];

        if (item.id === someId) {
            return item;
        }
    }
}

export function addNewNote(someArray, someId) {
    // you only need let for reassignment. if you're only mutating properties, const works fine
    const result = findById(someArray, someId);
    if (result) {
        result.count++;
    } else {
        const theNote = findById(notesData, someId);
        const newNote = {
            id: theNote.id,
            note: theNote.note,
            count: 1,
        };
        someArray.push(newNote);
    }
    return someArray;

}

const GUEST = 'GUEST';

export function setInLocalStorage(key, value) {
    const stringyItem = JSON.stringify(value);
    localStorage.setItem(key, stringyItem);
}

export function getLocalStorage() {
    const myKey = localStorage.getItem(GUEST);
    return JSON.parse(myKey);
}