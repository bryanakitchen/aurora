
//KEYS Event Listenters
const whiteKeys = document.querySelectorAll('.white-keys');
const blackKeys = document.querySelectorAll('.black-keys');
//Waveform Event Listeners
const waveformControlSine = document.getElementById('sine');
const waveformControlSquare = document.getElementById('square');
const waveformControlTriangle = document.getElementById('triangle');
const waveformControlSawtooth = document.getElementById('sawtooth');
let waveform = document.querySelector(':checked').value;

//Makes a spread that combines the keys arrays
const keys = [...whiteKeys, ...blackKeys];

//creates a event listeners for each key
for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener('click', (e) => {
        // note.play(e.target.value, )
        console.log(keys);
    });
}

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

//Below is all of that CLASS stuff that we will want to make an instance for for each key, but currently is only for one button

const oscButton = document.getElementById('osc-key');

class Sound {

    constructor(context) {
        this.context = context;
    }

    init(type) {
        this.oscillator = this.context.createOscillator();
        this.gainNode = this.context.createGain();

        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        this.oscillator.type = type;
    }

    play(value, time, type) {
        this.init(type);

        this.oscillator.frequency.value = value;
        this.gainNode.gain.setValueAtTime(1, this.context.currentTime);

        this.oscillator.start(time);
        this.stop(time);
    }

    stop(time) {
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + 1);
        this.oscillator.stop(time + 1);
    }
}

const context = new (window.AudioContext || window.webkitAudioContext)();

oscButton.addEventListener('click', () => {
    let note = new Sound(context);
    let now = context.currentTime;
    note.play(261.63, now, waveform);
    //     note.play(293.66, now + 0.5);
    //     note.play(329.63, now + 1);
    //     note.play(349.23, now + 1.5);
    //     note.play(392.00, now + 2);
    //     note.play(440.00, now + 2.5);
    //     note.play(493.88, now + 3);
    //     note.play(523.25, now + 3.5);
});

// oscButton.addEventListener('mouseup', e => {
//     e.target.value = note.stop();

// }); 




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
