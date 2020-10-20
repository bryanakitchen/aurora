
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

// class Sound {

//     constructor(context) {
//         this.context = context;
//     }

//     init(type) {
//         this.oscillator = this.context.createOscillator();
//         this.gainNode = this.context.createGain();

//         this.oscillator.connect(this.gainNode);
//         this.gainNode.connect(this.context.destination);
//         this.oscillator.type = type;
//     }

//     play(value, time, type) {
//         this.init(type);

//         this.oscillator.frequency.value = value;
//         this.gainNode.gain.setValueAtTime(1, this.context.currentTime);

//         this.oscillator.start(time);
//         // this.stop(time);
//     }

//     stop(time) {
//         this.gainNode.gain.exponentialRampToValueAtTime(0.001, time);
//         this.oscillator.stop(time);
//     }
// }

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
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 3);
    oscillator.stop(time + 3);
}


const context = new (window.AudioContext || window.webkitAudioContext)();

// oscButton.addEventListener('click', () => {
//     let note = new Sound(context);
//     let now = context.currentTime;
//     note.play(261.63, now, waveform);
// });

// oscButton.addEventListener('mouseup', e => {
//     e.target.value = note.stop();
// }); 

//Make an array of Pitches
const pitchObject = {
    'C3': 130.81,
    'Cs3': 138.59,
    'D3': 146.83,
    'Ds3': 155.56,
    'E3': 164.81,
    'F3': 174.61,
    'Fs3': 185.00,
    'G3': 196.00,
    'Gs3': 207.65,
    'A3': 220.00,
    'As3': 233.08,
    'B3': 246.94,
    'C4': 261.63,
};

let pitchModifier = 1;



//creates a event listeners for each key
for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener('mousedown', (e) => {
        // let note = new Sound(context);
        let now = context.currentTime;
        let currentPitch = pitchObject[keys[i].id] * pitchModifier;
        e.target.value = startSound(currentPitch, now, waveform);
    });

    // keys[i].addEventListener('mouseup', (e) => {
    //     // let note = new Sound(context);
    //     let now = context.currentTime + 1;
    //     e.target.value = stopSound(now);
    // });

}


let waveform = document.querySelector(':checked').value;
//EVENT LISTENERS FOR SYNTH WAVESHAPE PARAMETER INTERFACE
waveformControlSine.addEventListener('click', function (event) {

    waveform = event.target.value;
    // console.log(waveform);
});
waveformControlSquare.addEventListener('click', function (event) {
    waveform = event.target.value;
    // console.log(waveform);

});
waveformControlTriangle.addEventListener('click', function (event) {
    waveform = event.target.value;
    // console.log(waveform);

});
waveformControlSawtooth.addEventListener('click', function (event) {
    waveform = event.target.value;
    // console.log(waveform);

});



// //waverforms
// OscillatorNode.type = 'sine' | 'square' | 'triangle' | 'sawtooth';

// //web api context
// var context = new (window.AudioContext || window.webkitAudioContext)();

// //osc node
// var oscillator = context.createOscillator();

// //waveform choice
// oscillator.type = 'sine';
// //osc freq or note
// oscillator.frequency.value = 440;
// //osc desctination
// oscillator.connect(context.destination);
// //osc play
// oscillator.start();
// //osc stop
// oscillator.stop();

// //volume knob
// var gain = context.createGain();
// oscillator.connect(gain);
// gain.connect(context.destination);

// //ADSR of sorts
// var now = context.currentTime;
// gain.gain.setValueAtTime(1, now);
// gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
// oscillator.start(now);
// oscillator.stop(now + 0.5);
