//DOM SYNTH CONTROLS

    const waveformControlSine = document.getElementById('#sine');
    const waveformControlSquare = document.getElementById('#square');
    const waveformControlTriangle = document.getElementById('#triangle');
    const waveformControlSawtooth = document.getElementById('#sawtooth');
    let waveform = waveformControlSine.value || waveformControlSquare.value || waveformControlTriangle.value || waveformControlSawtooth.value;

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




//MAIN VOLUME
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const gain = audioCtx.createGain();
const gainControl = document.getElementById('gain');

gainControl.addEventListener('mousemove', function(event) {
    gain.gain.setValueAtTime(event.target.value, audioCtx.currentTime);
});

