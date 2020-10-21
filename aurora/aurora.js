import { addNewNote, pitchObject, setInLocalStorage } from '../utils.js';
//import { setInLocalStorage } from '../app.js';

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

//const oscButton = document.getElementById('osc-key');


//TURNS ON AN AUDIO CONTEXT
//SET UP AUDIO CONTEXT
const context = new (window.AudioContext || window.webkitAudioContext)();

//PATHING: Makes a global state for master gain and analyser
const masterGainNode = context.createGain();
const analyserNode = context.createAnalyser();

//MASTER OUTPUT ROUTING (GOES FROM INTERNAL)
analyserNode.connect(masterGainNode);
masterGainNode.connect(context.destination);


//creates variables to be used in the following functions
let oscillator;
let gainNode;
let release = .8;

// CREATES OSCILLATOR AND SETS UP ROUTING FROM WITHIN EACH OSCILLATOR NOTE EVENT
function init(type) {
    oscillator = context.createOscillator();
    gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.type = type;

}
// STARTS OSCILLATOR WITH INTERNAL GAIN PRESETS (STARTS @ 1=full)
function startSound(value, time, waveform) {
    init(waveform);
    oscillator.frequency.value = value;
    gainNode.gain.setValueAtTime(1, context.currentTime);

    oscillator.start(time);
}
// STOPS OSCILLATOR WITH BUILT_IN FADEOUT
//FADEOUT CAN BE MODIFED (release) [STRETCH GOAL]
function stopSound(time) {
    gainNode.gain.setTargetAtTime(0, time, 0.015);
}

// CREATES OBJECTS TO BE USED IN EACH KEYBOARD EVENTLISTENER
let pitchModifier = 1; // (STRETCH) CAN BE AN OCTAVE SWITCHER BY MULTIPLYING
let resultsArray = [];
let songArray = []; //UNUSED.... THOUGHTS

//CREATES EVENT LISTENERS FOR EACH KEY DEPRESSED (mousedown)
for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener('mousedown', (e) => {
        let now = context.currentTime;
        let currentPitch = pitchObject[keys[i].id] * pitchModifier;
        e.target.value = startSound(currentPitch, now, waveform);
        let activeKey = e.target.getAttribute('id');

        // SENDS NOTE COUNT TO localSTORAGE
        addNewNote(resultsArray, activeKey);
        setInLocalStorage('NOTES', resultsArray);

    });

    //CREATES EVENTLISTENER TO CALL stopSound FUNCTION (mouseup)
    keys[i].addEventListener('mouseup', (e) => {
        let now = context.currentTime;
        e.target.value = stopSound(now);
    });

}

//CALL WAVEFORM RADIO FROM THE DOM
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
