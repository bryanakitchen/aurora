//Make an array of Pitches
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
        note: 'C3',
    },
    {
        id: 'Cs3',
        note: 'Cs3',
    },
    {
        id: 'D3',
        note: 'D3',
    },
    {
        id: 'Ds3',
        note: 'Ds3',
    },
    {
        id: 'E3',
        note: 'E3',
    },
    {
        id: 'F3',
        note: 'F3',
    },
    {
        id: 'Fs3',
        note: 'Fs3',
    },
    {
        id: 'G3',
        note: 'G3',
    },
    {
        id: 'Gs3',
        note: 'Gs3',
    },
    {
        id: 'A3',
        note: 'A3',
    },
    {
        id: 'As3',
        note: 'As3',
    },
    {
        id: 'B3',
        note: 'B3',
    },
    {
        id: 'C4',
        note: 'C4',
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
    let result = findById(someArray, someId);
    if (result) {
        result.count++;
    } else {     
        let theNote = findById(notesData, someId);
        const newNote = {
            id: theNote.id,
            note: theNote.note,
            count: 1,
        };
        someArray.push(newNote); 
    }
    return someArray;

}


// export function addInitialKey(someArray, someId) {
//     const result = findById(notesData, someId);
//     const newKey = {
//         note: result.id,
//         count: 0,
//     };
//     someArray.push(newKey);

//     console.log(newKey);
// }

// export function incrementCounter(someArray, someId) {
//     let result = findById(someArray, someId);
//     if (!result) {
//         addInitialKey(someArray, someId);

//         result = findById(someArray, someId);
//     }
//     result.count++;
// }


// upon click, push note into array
// need save button