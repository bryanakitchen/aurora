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
//SET UP AUDIO CONTEXT
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
//FADEOUT CAN BE MODIFED (release) [STRETCH GOAL]
function stopSound(time) {
    gainNode.gain.setTargetAtTime(0, time, 0.015);
}

//THREE new funtions
//discoInit, startDisco stopDIsco (stretch)
function loadDisco(url, context) {
    return fetch(url)
        .then(res => res.arrayBuffer())
        .then(buffer => context.decodeAudioData(buffer))

    //ACCEPTS A PAD ELEMENT OBJECT PARAMETER
    //"object" can be key[i]
    function startDisco(object, context, time) {

        //SET VALUE FOR NAME SO THAT IT MATCHES THE ID
        //const divData = document.querySelector('data-sound')
        //object.name = object.id;
        //SETS THE SOURCE PROPERTY TO MATCH THE VALUE OF HTML (data-sound)
        let s = context.createBufferSource();
        s.connect(analyserNode);
        //object.source = object.dataset.sound;
        //loads sound file to the buffer
        loadDisco(object.dataset.sound, context)

            .then((buffer) => s.buffer = buffer)
            .then(() => s.start(time))
        //
        //makes new audio source node
        //var s = context.createBufferSource();
        //sets node's source property
        // s.buffer = object.buffer;
        //connects audio to the computer's speakers --> we'll want to change this to analyser,not destination
        //s.connect(analyserNode);
        //plays the sound
        //s.start(time);
        // attach audio source to 
        //object.s = s;
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