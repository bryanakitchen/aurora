

//waverforms
OscillatorNode.type = 'sine' | 'square' | 'triangle' | 'sawtooth';

//web api context
var context = new (window.AudioContext || window.webkitAudioContext)();

//osc node
var oscillator = context.createOscillator();

//waveform choice
oscillator.type = 'sine';
//osc freq or note
oscillator.frequency.value = 440;
//osc desctination
oscillator.connect(context.destination);
//osc play
oscillator.start();
//osc stop
oscillator.stop();

//volume knob
var gain = context.createGain();
oscillator.connect(gain);
gain.connect(context.destination);

//ADSR of sorts
var now = context.currentTime;
gain.gain.setValueAtTime(1, now);
gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
oscillator.start(now);
oscillator.stop(now + 0.5);
