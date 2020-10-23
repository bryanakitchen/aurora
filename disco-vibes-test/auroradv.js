import { addNewNote, pitchObject, setInLocalStorage } from '../utils.js';


//KEYS DOM ELEMENTS
const whiteKeys = document.querySelectorAll('.white-keys');
const blackKeys = document.querySelectorAll('.black-keys');
//Waveform DOM ELEMENTS
const waveformControlSine = document.getElementById('sine');
const waveformControlSquare = document.getElementById('square');
const waveformControlTriangle = document.getElementById('triangle');
const waveformControlSawtooth = document.getElementById('sawtooth');
const waveformControlDiscovibes = document.getElementById('discovibes');

//MASTER VOLUME DOM ELEMENT
const gainControl = document.getElementById('gain-control');

//Makes a spread that combines the keys arrays
const keys = [...whiteKeys, ...blackKeys];

//TURNS ON AN AUDIO CONTEXT
const context = new (window.AudioContext || window.webkitAudioContext)();

//PATHING: Makes a global state for master gain and analyser
const masterGainNode = context.createGain();
// other fancy nodes could go here
const analyserNode = context.createAnalyser();

//MASTER OUTPUT ROUTING (GOES FROM INTERNAL)
analyserNode.connect(masterGainNode);
//other things could go here
masterGainNode.connect(context.destination);

//creates variables to be used in the following functions
let oscillator;
let gainNode;

// variables to be used within other filter features
let release = .8; // keep for now

// CREATES OSCILLATOR AND SETS UP ROUTING FROM WITHIN EACH OSCILLATOR NOTE EVENT
function init(type) {
    oscillator = context.createOscillator();
    gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(analyserNode);
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
// [STRETCH GOAL] FADEOUT CAN BE MODIFED (release)
function stopSound(time) {
    gainNode.gain.setTargetAtTime(0, time, 0.015);
}

// PREPARES THE AUDIO FILE (called within startDisco())
//connects URL link to ARRAY BUFFER, PREPARES to be sent to audioBufferSource
function loadDisco(url, context) {
    return fetch(url)
        .then(res => res.arrayBuffer())
        .then(buffer => context.decodeAudioData(buffer))
}
//ACCEPTS A PAD ELEMENT OBJECT PARAMETER
//"object" can be key[i]
function startDisco(object, context, time) {
    //CREATES A BUFFER SOURCE TO RECEIVE THE AUDIO
    let source = context.createBufferSource();
    // CONNECT THE BUFFER SOURCE NODE TO OUR GLOBAL AUDIO NODE CHAIN, WHICH BEINS WITH THE analyserNode
    source.connect(analyserNode);

    //SETS THE SOURCE PROPERTY TO MATCH THE VALUE OF HTML (data-sound)
    loadDisco(object.dataset.sound, context)
        //CONNECT THE AUDIO IN BUFFER TO the BUFFER SOURCE NODE
        .then((buffer) => source.buffer = buffer)
        // AND, FINALLY, PLAY THE AUDIO
        .then(() => source.start(time))
};


// CREATES OBJECTS TO BE USED IN EACH KEYBOARD EVENTLISTENER
let pitchModifier = 1; // (STRETCH) CAN BE AN OCTAVE SWITCHER BY MULTIPLYING
let resultsArray = [];

//CREATES EVENT LISTENERS FOR EACH KEY DEPRESSED (mousedown)
for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener('mousedown', (e) => {
        let now = context.currentTime;

        if (waveform === 'discovibes') {
            startDisco(keys[i], context, now);
        } else {
            let currentPitch = pitchObject[keys[i].id] * pitchModifier;
            e.target.value = startSound(currentPitch, now, waveform);
        }
        let activeKey = e.target.getAttribute('id');

        // SENDS NOTE COUNT TO localSTORAGE
        addNewNote(resultsArray, activeKey);
        setInLocalStorage('NOTES', resultsArray);

    });

    //CREATES EVENTLISTENER TO CALL stopSound FUNCTION (mouseup)
    keys[i].addEventListener('mouseup', (e) => {
        let now = context.currentTime;
        if (waveform !== 'discovibes') {
            e.target.value = stopSound(now);
        }
    });
}

//EVENT LISTENER FOR GAIN (MAIN VOLUME) SLIDER
gainControl.addEventListener('mousemove', function (e) {
    masterGainNode.gain.setValueAtTime(e.target.value, context.currentTime);
});

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

waveformControlDiscovibes.addEventListener('click', function (event) {
    waveform = event.target.value;
    //function startDisco(object, context, time);
});
