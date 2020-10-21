import { addNewNote, pitchObject } from '../utils.js';
import { setInLocalStorage } from '../app.js';

//KEYS Event Listenters
const whiteKeys = document.querySelectorAll('.white-keys');
const blackKeys = document.querySelectorAll('.black-keys');
//Waveform Event Listeners
const waveformControlSine = document.getElementById('sine');
const waveformControlSquare = document.getElementById('square');
const waveformControlTriangle = document.getElementById('triangle');
const waveformControlSawtooth = document.getElementById('sawtooth');

//Makes a spread that combines the keys arrays
const keys = [...whiteKeys, ...blackKeys];

const oscButton = document.getElementById('osc-key');

let oscillator;
let gainNode;
let release = .8;

function init(type) {
    oscillator = context.createOscillator();
    gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.type = type;
    
}

function startSound(value, time, waveform) {
    init(waveform);
    oscillator.frequency.value = value;
    gainNode.gain.setValueAtTime(1, context.currentTime);

    oscillator.start(time);
}

function stopSound(time) {
    gainNode.gain.setTargetAtTime(0, time, 0.015);
}


const context = new (window.AudioContext || window.webkitAudioContext)();

let pitchModifier = 1;
<<<<<<< HEAD

=======
let resultsArray = [];
let songArray = [];
>>>>>>> 29d8a44b0b9fcb7ab5bc6936dccb044a8f01f423

//creates a event listeners for each key
for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener('mousedown', (e) => {
        // let note = new Sound(context);
        let now = context.currentTime;
        let currentPitch = pitchObject[keys[i].id] * pitchModifier;
        e.target.value = startSound(currentPitch, now, waveform);

        let activeKey = e.target.getAttribute('id');

        addNewNote(resultsArray, activeKey);

        setInLocalStorage('NOTES', resultsArray);

        // push

    });

    keys[i].addEventListener('mouseup', (e) => {
        // let note = new Sound(context);
        let now = context.currentTime;
        e.target.value = stopSound(now);
    });

}

let waveform = document.querySelector(':checked').value;
//EVENT LISTENERS FOR SYNTH WAVESHAPE PARAMETER INTERFACE
waveformControlSine.addEventListener('click', function (event) {

    waveform = event.target.value;
});
waveformControlSquare.addEventListener('click', function (event) {
    waveform = event.target.value;

});
waveformControlTriangle.addEventListener('click', function (event) {
    waveform = event.target.value;

});
waveformControlSawtooth.addEventListener('click', function (event) {
    waveform = event.target.value;

});


// //volume knob
// var gain = context.createGain();
// oscillator.connect(gain);
// gain.connect(context.destination);
