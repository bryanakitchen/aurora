
const oscButton = document.getElementById('osc-key');

class Sound {

    constructor(context) {
        this.context = context;
    }

    init() {
        this.oscillator = this.context.createOscillator();
        this.gainNode = this.context.createGain();

        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        this.oscillator.type = 'sine';
    }

    play(value, time) {
        this.init();

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
    note.play(261.63, now);
    note.play(293.66, now + 0.5);
    note.play(329.63, now + 1);
    note.play(349.23, now + 1.5);
    note.play(392.00, now + 2);
    note.play(440.00, now + 2.5);
    note.play(493.88, now + 3);
    note.play(523.25, now + 3.5);
});

// oscButton.addEventListener('mouseup', e => {
//     e.target.value = note.stop();

// }); 



//starts the sudio
//oscillator.start();

//stops the audio
//oscillator.stop();