/* eslint-disable no-undef */

//LOCALSTORAGE DATA
// const notesArray = JSON.parse(localStorage.getItem('notes'));
const playAgainButton = document.getElementById('play-again-button');

//HARDCODED DATA  
const userNotes = [
    { id: 'C', notes: 3 },
    { id: 'C#', notes: 5 },
    { id: 'D', notes: 7 },
    { id: 'D#', notes: 8 },
    { id: 'E', notes: 3 },
    { id: 'F', notes: 1 },
    { id: 'F#', notes: 0 },
    { id: 'G', notes: 5 },
    { id: 'G#', notes: 1 },
    { id: 'A', notes: 3 },
    { id: 'A#', notes: 2 },
    { id: 'B', notes: 9 },
];

const notes = [];
const noteLabels = [];

//HARDCODED DATA LOOP
userNotes.forEach(item => {
    notes.push(item.notes);
    noteLabels.push(item.id);
});

//LOCAL STORAGE USER DATA LOOP
// for (let i = 0; i < notesArray.length; i++) {
//     const notesItem = notesArray[i];
//     const label = notesItem.id;
//     const noteData = notesItem.notes;
//     notes.push(noteData);
//     noteLabels.push(label);
// }


const ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, {
    type: 'radar',
    data: {
        labels: noteLabels,
        datasets: [{
            label: '# of Notes',
            data: notes,
            backgroundColor: [
                'rgba(0, 128, 128, 0.2)',
                'rgba(0, 128, 128, 0.2)',
                'rgba(255, 206, 128, 0.2)',
                'rgba(75, 192, 128, 0.2)',
                'rgba(153, 102, 128, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(0, 128, 128, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


playAgainButton.addEventListener('click', () => {

    localStorage.clear();   
    window.location = '../aurora/index.html';
});

