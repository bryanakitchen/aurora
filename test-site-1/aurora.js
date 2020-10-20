//WAVEFORMS

const waveformControlSine = document.getElementById('sine');
const waveformControlSquare = document.getElementById('square');
const waveformControlTriangle = document.getElementById('triangle');
const waveformControlSawtooth = document.getElementById('sawtooth');
let waveform = document.querySelector(':checked').value;
// console.log(waveform);


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
        this.gainNode.gain.exponentialRampToValueAtTime(0.05, time + 1);
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
//     e.target.value = note.stop(now);

// }); 



//starts the sudio
//oscillator.start();

//stops the audio
//oscillator.stop();

