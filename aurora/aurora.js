import { addNewNote, pitchObject, setInLocalStorage } from '../utils.js';

//KEYS DOM ELEMENTS
const whiteKeys = document.querySelectorAll('.white-keys');
const blackKeys = document.querySelectorAll('.black-keys');
//PAD DOM ELEMENTS
const pads = document.querySelectorAll('.pad');
//Waveform DOM ELEMENTS
const waveformControlSine = document.getElementById('sine');
const waveformControlSquare = document.getElementById('square');
const waveformControlTriangle = document.getElementById('triangle');
const waveformControlSawtooth = document.getElementById('sawtooth');
const waveformControlDiscovibes = document.getElementById('discovibes');

//MASTER VOLUME DOM ELEMENT
const gainControl = document.getElementById('gain-control');
const filterControl = document.getElementById('filter-control');

//Makes a spread that combines the keys arrays
// siiiick. some career track stuff right there
const keys = [...whiteKeys, ...blackKeys];

//TURNS ON AN AUDIO CONTEXT
//SET UP AUDIO CONTEXT
const context = new (window.AudioContext || window.webkitAudioContext)();

//PATHING: Makes a global state for master gain, analyser, and filter
const masterGainNode = context.createGain();
const analyserNode = context.createAnalyser();
const biquadFilter = context.createBiquadFilter();

//MASTER OUTPUT ROUTING (GOES FROM INTERNAL)
biquadFilter.connect(masterGainNode);
masterGainNode.connect(analyserNode);
analyserNode.connect(context.destination);

//creates variables to be used in the following functions
let oscillator;
let gainNode;

// CREATES OSCILLATOR AND SETS UP ROUTING FROM WITHIN EACH OSCILLATOR NOTE EVENT
function init(type) {
    oscillator = context.createOscillator();
    gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(biquadFilter);
    oscillator.type = type;
}

// LOWPASS FILTER PRESETS
biquadFilter.type = 'lowpass';
biquadFilter.frequency.value = 5000;

// STARTS OSCILLATOR WITH INTERNAL GAIN PRESETS (STARTS @ 1=full)
function startSound(value, time, waveform) {
    init(waveform);
    oscillator.frequency.value = value;
    gainNode.gain.setValueAtTime(.3, context.currentTime);
    oscillator.start(time);
}

// STOPS OSCILLATOR WITH BUILT_IN FADEOUT
function stopSound(time) {
    gainNode.gain.setTargetAtTime(0, time, 0.015);
}

// PREPARES THE AUDIO FILE (called within startDisco())
//connects URL link to ARRAY BUFFER, PREPARES to be sent to audioBufferSource
function loadDisco(url, context) {
    return fetch(url)
    // i probably would have preferred to see async await instead of .then to keep the code more readable
        .then(res => res.arrayBuffer())
        .then(buffer => context.decodeAudioData(buffer));
}
//ACCEPTS A PAD ELEMENT OBJECT PARAMETER
//"object" can be key[i]
function startDisco(object, context, time) {
    //CREATES A BUFFER SOURCE TO RECEIVE THE AUDIO
    let source = context.createBufferSource();
    // CONNECT THE BUFFER SOURCE NODE TO OUR GLOBAL AUDIO NODE CHAIN, WHICH BEGINS WITH THE analyserNode
    source.connect(biquadFilter);
    //SETS THE SOURCE PROPERTY TO MATCH THE VALUE OF HTML (data-sound)
    loadDisco(object.dataset.sound, context)
        //CONNECT THE AUDIO IN BUFFER TO the BUFFER SOURCE NODE
        .then((buffer) => source.buffer = buffer)
        // AND, FINALLY, PLAY THE AUDIO
        .then(() => source.start(time));
}
// CREATES OBJECTS TO BE USED IN EACH KEYBOARD EVENTLISTENER
let pitchModifier = 1; 
let resultsArray = [];

//CREATES EVENT LISTENERS FOR EACH KEY DEPRESSED (mousedown)
for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener('mousedown', (e) => {
        const now = context.currentTime;
        // CHOOSES BETWEEN OSCILLATOR OR SAMPLER SYNTHS
        if (waveform === 'discovibes') {
            startDisco(keys[i], context, now);
        } else {
            const currentPitch = pitchObject[keys[i].id] * pitchModifier;
            e.target.value = startSound(currentPitch, now, waveform);
        }

        const activeKey = e.target.getAttribute('id');
        // SENDS NOTE COUNT TO localSTORAGE
        addNewNote(resultsArray, activeKey);
        setInLocalStorage('NOTES', resultsArray);
    });

    //CREATES EVENTLISTENER TO CALL stopSound FUNCTION (mouseup)
    keys[i].addEventListener('mouseup', (e) => {
        const now = context.currentTime;
        if (waveform !== 'discovibes') {
            e.target.value = stopSound(now);
        }
    });

    //CREATES EVENTLISTENER TO CALL stopSound FUNCTION (mouseleave)
    keys[i].addEventListener('mouseleave', (e) => {
        const now = context.currentTime;
        if (waveform !== 'discovibes') {
            e.target.value = stopSound(now);
        }
    });
}

//EVENT LISTENER FOR GAIN (MAIN VOLUME) SLIDER
gainControl.addEventListener('mousemove', function(e) {
    masterGainNode.gain.setValueAtTime(e.target.value, context.currentTime);
});

//EVENT LISTENER FOR LOW PASS SLIDER
filterControl.addEventListener('mousemove', function(e) {
    biquadFilter.frequency.setValueAtTime(e.target.value, context.currentTime);
});

//CALL WAVEFORM RADIO FROM THE DOM
let waveform = document.querySelector(':checked').value;

function handleWaveform(event) {
    waveform = event.target.value;
}
//EVENT LISTENERS FOR SYNTH WAVESHAPE PARAMETER INTERFACE
// would have preferred a class that all of these shared, with a for loop that added this same even handler to all of them
const controls = document.querySelector('.some-class-that-all-these-have');
controls.forEach(control => control.addEventListener('click', handleWaveform));

const resetButton = document.getElementById('reset');

resetButton.addEventListener('click', () => {
    window.location = './index.html';
});

//PLAYS THE AUDIO FOR EACH OF THE DRUMPADS
for (let i = 0; i < pads.length; i++) {
    pads[i].addEventListener('mousedown', (e) => {
        let now = context.currentTime;
        console.log(pads[i]);
        startDisco(pads[i], context, now);
    });
}

// VISUALISER LEFT
const canvas = document.getElementById('visualiser-left');
const ctx = canvas.getContext('2d');

// SET FFT SIZE
analyserNode.fftSize = 256;
const bufferLength = analyserNode.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

ctx.clearRect(0, 0, 400, 150);

function draw() {
    const drawVisual = requestAnimationFrame(draw);
    analyserNode.getByteFrequencyData(dataArray);
    ctx.fillStyle = 'rgb(11, 19, 43)';
    ctx.fillRect(0, 0, 400, 150);

    const barWidth = (480 / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;

        ctx.fillStyle = 'rgb(' + (barHeight + 10) + ',255,233)';
        ctx.fillRect(x, 150 - barHeight, barWidth, barHeight);

        x += barWidth + 1;
    }
}

draw();

// VISUALISER RIGHT
const canvasRight = document.getElementById('visualiser-right');
const ctxRight = canvasRight.getContext('2d');

// SET FFT SIZE
analyserNode.fftSize = 256;
const bufferRight = analyserNode.frequencyBinCount;
const dataArrayRight = new Uint8Array(bufferRight);

ctxRight.clearRect(0, 0, 400, 150);

// hmmm, seems like you could have added some arguments to the draw function and reused it to apply to this case
function drawRight() {
    const drawVisual = requestAnimationFrame(drawRight);
    analyserNode.getByteFrequencyData(dataArrayRight);
    ctxRight.fillStyle = 'rgb(11, 19, 43)';
    ctxRight.fillRect(0, 0, 400, 150);

    const barWidth = (480 / bufferRight) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferRight; i++) {
        barHeight = dataArrayRight[i] / 2;
        // Colors change according to the bar height
        ctxRight.fillStyle = 'rgb(' + (barHeight + 10) + ',255,233)';
        ctxRight.fillRect(x, 150 - barHeight, barWidth, barHeight);

        x += barWidth + 1;
    }
}

drawRight();