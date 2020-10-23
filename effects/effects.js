import { addNewNote, pitchObject, setInLocalStorage } from '../utils.js';

//KEYS DOM ELEMENTS
const whiteKeys = document.querySelectorAll('.white-keys');
const blackKeys = document.querySelectorAll('.black-keys');
//Waveform DOM ELEMENTS
const waveformControlSine = document.getElementById('sine');
const waveformControlSquare = document.getElementById('square');
const waveformControlTriangle = document.getElementById('triangle');
const waveformControlSawtooth = document.getElementById('sawtooth');

//MASTER VOLUME DOM ELEMENT
const gainControl = document.getElementById('gain-control');
//MASTER REVERB
const verbToggle = document.getElementById('reverb-control');
//Makes a spread that combines the keys arrays
const keys = [...whiteKeys, ...blackKeys];

//TURNS ON AN AUDIO CONTEXT
//SET UP AUDIO CONTEXT
const context = new (window.AudioContext || window.webkitAudioContext)();

//PATHING: Makes a global state for master gain and analyser
const masterGainNode = context.createGain();
// other fancy nodes could go here
const analyserNode = context.createAnalyser();
// reverb node
const reverbNode = context.createConvolver();
// someOtherAudioNode -> reverb -> destination
reverbNode.connect(analyserNode);
//MASTER OUTPUT ROUTING (GOES FROM INTERNAL)
analyserNode.connect(masterGainNode);

//other things could go here
masterGainNode.connect(context.destination);

//creates variables to be used in the following functions
let oscillator;
let gainNode;
let release = .8; // keep for now, may be useful for "release" slider


//REVERB STUFF
// async function createReverb() {
//     let convolver = context.createConvolver();

//     // load impulse response from file
//     let response     = await fetch('../assets/stonereverb.wav');
//     let arraybuffer  = await response.arrayBuffer();
//     convolver.buffer = await context.decodeAudioData(arraybuffer);

//     return convolver;
//     console.log(convolver)
// }

// let reverb = await createReverb();
// let convolverTime = 1.00;
// function convolverEffect() {
//     let convolver = context.createConvolver(),
//         noiseBuffer = context.createBuffer(2, convolverTime * context.sampleRate, context.sampleRate),
//         left = noiseBuffer.getChannelData(0),
//         right = noiseBuffer.getChannelData(1);
//     for (let i = 0; i < noiseBuffer.length; i++) {
//         left[i] = Math.random() * 2 - 1;
//         right[i] = Math.random() * 2 - 1;
//     }
//     convolver.buffer = noiseBuffer;
//     return convolver;
// }

verbToggle.addEventListener('click', () => {
    if (verbToggle.checked) {
        analyserNode.connect(convolverEffect);
        convolverEffect.connect(masterGainNode);
    } else {
        analyserNode.disconnect(convolverEffect);

        analyserNode.connect(masterGainNode);
    }
});
const getImpulseBuffer = (context, impulseUrl) => {
    return fetch(impulseUrl)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
}

// const getLiveAudio = (context) => {
//     return navigator.mediaDevices.getUserMedia({audio: true})
//     .then(stream => context.createMediaStreamSource(stream));
// } 

async function init(){
  const context = new AudioContext();
  const input = await gainNode(context)
  const convolver = context.createConvolver()
  //lets assume there is an mp3 file in root of our project
  convolver.buffer = await getImpulseBuffer(context, '../assets/stonereverb.wav')
  
  input.connect(convolver).connect(context.destination)
}

init()
//DELAY SHIT


// var synthDelay = context.createDelay(5.0);
// var playSynth = document.querySelector('.play-synth');
// var stopSynth = document.querySelector('.stop-synth');
// var rangeSynth = document.querySelector('.stop-synth + input');
// var destination = context.destination;
// var synthSource;
// var buffers = [];
// playSynth.onclick = function() {
//     synthSource = context.createBufferSource();
//     synthSource.buffer = buffers[2];
//     synthSource.loop = true;
//     synthSource.start();
//     synthSource.connect(synthDelay);
//     synthDelay.connect(destination);
//     this.setAttribute('disabled', 'disabled');
// };

// stopSynth.onclick = function() {
//     synthSource.disconnect(synthDelay);
//     synthDelay.disconnect(destination);
//     synthSource.stop();
//     playSynth.removeAttribute('disabled');
// };


// var delay1;

// rangeSynth.oninput = function() {
//     delay1 = rangeSynth.value;
//     synthDelay.delayTime.value = delay1;
// };


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

// CREATES OBJECTS TO BE USED IN EACH KEYBOARD EVENTLISTENER
let pitchModifier = 1; // (STRETCH) CAN BE AN OCTAVE SWITCHER BY MULTIPLYING
let resultsArray = [];

//CREATES EVENT LISTENERS FOR EACH KEY DEPRESSED (mousedown)
for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener('mousedown', (e) => {
        let now = context.currentTime;

        //if 5th radio is checked
        //e.target.value WILL go to function that starts audiobuffer node
        //let activeKey = e.target.getAttribute('id');
        //else do what's below
        let currentPitch = pitchObject[keys[i].id] * pitchModifier;
        e.target.value = startSound(currentPitch, now, waveform);
        let activeKey = e.target.getAttribute('id');
        // else statement would end here
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

//EVENT LISTENER FOR GAIN (MAIN VOLUME) SLIDER
gainControl.addEventListener('mousemove', function(e) {
    masterGainNode.gain.setValueAtTime(e.target.value, context.currentTime);
});

//CALL WAVEFORM RADIO FROM THE DOM
let waveform = document.querySelector(':checked').value;

//EVENT LISTENERS FOR SYNTH WAVESHAPE PARAMETER INTERFACE
waveformControlSine.addEventListener('click', function(event) {
    waveform = event.target.value;
});
waveformControlSquare.addEventListener('click', function(event) {
    waveform = event.target.value;

});
waveformControlTriangle.addEventListener('click', function(event) {
    waveform = event.target.value;

});
waveformControlSawtooth.addEventListener('click', function(event) {
    waveform = event.target.value;
});

const resetButton = document.getElementById('reset');

resetButton.addEventListener('click', () => {
    window.location = './index.html';
});
