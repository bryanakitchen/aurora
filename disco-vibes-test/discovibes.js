//var context = new AudioContext();

const pads = document.querySelectorAll('.pad');
//const analyserNode = context.createAnalyser();
const context = new (window.AudioContext || window.webkitAudioContext)();
function loadDisco(object, url, context) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = function () {
        context.decodeAudioData(request.response, function (buffer) {
            object.buffer = buffer;
        });
    };
    request.send();
}

//this will live in the if else statement regarding the 5th button, it adds the audio properties to the relative keys
//ACCEPTS A PAD ELEMENT OBJECT PARAMETER
//"object" can be key[i]
function startDisco(object, context) {

    //SET VALUE FOR NAME SO THAT IT MATCHES THE ID
    //const divData = document.querySelector('data-sound')
    object.name = object.id;
    //SETS THE SOURCE PROPERTY TO MATCH THE VALUE OF HTML (data-sound)
    //do I need to chenge the () to {}?
    //object.source = $(object).data('sound');
    object.source = object.dataset.sound;
    //loads sound file to the buffer
    loadDisco(object, object.source, context);
    //
    //makes new audio source node
    var s = context.createBufferSource();
    //sets node's source property
    s.buffer = object.buffer;
    //connects audio to the computer's speakers --> we'll want to change this to analyser,not destination
    s.connect(analyserNode);
    //plays the sound
    s.start(0);
    // attach audio source to 
    object.s = s;
};
//}

for (let i = 0; i < pads.length; i++) {
    pads[i].addEventListener('mousedown', (e) => {
        let now = context.currentTime;
        startDisco(pads[i]);
    })
}