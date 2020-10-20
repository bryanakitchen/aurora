import { BAG } from '../constants.js';


const playAgainButton = document.getElementById('play-again-button');

const item = localStorage.getItem(BAG);
const parsedItem = JSON.parse(item);

const pokemonCaught = parsedItem.map((bagItem) => {
    return bagItem.captured;
});

const pokemonLabels = parsedItem.map((bagItem) => {
    return bagItem.name;
});

const pokemonEncountered = parsedItem.map((bagItem) => {
    return bagItem.encountered;
});

const pokemonCaptured = [];
const pokemonLabeled = [];
const pokemonEncoutered = [];

for (let i = 0; i < item.length; i++) {
    const bagItem = item[i];

    pokemonCaptured.push(bagItem.captured);
    pokemonLabeled.push(bagItem.name);
    pokemonEncoutered.push(bagItem.encountered);

} 

playAgainButton.addEventListener('click', () => {

    localStorage.clear();   
    window.location = '../index.html';
});


var ctx = document.getElementById('myChart').getContext('2d');
// eslint-disable-next-line no-unused-vars
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: pokemonLabels,
        datasets: [{
            label: '# of Pokemon Captured',
            data: pokemonCaught,
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)',
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)',
                'rgba(255, 99, 132, 0.7)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 20
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