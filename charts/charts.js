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
    { id: 'F#', notes: 8 },
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
var gradientStroke = ctx.createLinearGradient(1100, 1200, 50, 0);
gradientStroke.addColorStop(0, '#0B132B');
gradientStroke.addColorStop(0.2, '#322F91');
gradientStroke.addColorStop(0.4, '#2F5191');
gradientStroke.addColorStop(0.6, '#2F7191');
gradientStroke.addColorStop(0.9, '#4CFFFE');
gradientStroke.addColorStop(1, '#4CFFFE');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: noteLabels,
        datasets: [{
            label: '# of Notes',
            data: notes,
            backgroundColor: gradientStroke,
            borderColor:               gradientStroke,
            pointBorderColor:          gradientStroke,
            pointBackgroundColor:      gradientStroke,
            pointHoverBackgroundColor: gradientStroke,
            pointHoverBorderColor:     gradientStroke,
            borderWidth: 1
        }]
    },
    options: { animation: {
        easing: 'easeInOutBack'
    },
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

