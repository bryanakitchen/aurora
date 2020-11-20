/* eslint-disable no-undef */

const notesArray = JSON.parse(window.localStorage.getItem('NOTES'));

// nice--can't get much more consice than that!
const notes = notesArray.map(note => note.count);
const noteLabels = notesArray.map(note => note.note);

const ctx = document.getElementById('myChart').getContext('2d');
// loving this gradient stuff! so cool!
var gradientStroke = ctx.createLinearGradient(800, 400, 100, 100);
gradientStroke.addColorStop(0, '#0B132B');
gradientStroke.addColorStop(0.2, '#322F91');
gradientStroke.addColorStop(0.4, '#2F5191');
gradientStroke.addColorStop(0.6, '#2F7191');
gradientStroke.addColorStop(1, '#4CFFFE');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: noteLabels,
        datasets: [{
            label: '# of Times You Played Each Note',
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
                beginAtZero: true,
                stepSize: 1,
                min: 0
            }
        }]
    }
    }
});
