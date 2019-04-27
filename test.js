const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");
editor.setOptions({fontSize:"20pt"});

//set volume
const vol = new Tone.Volume(-6).toMaster();

//create a synth and connect it to the master output (your speakers)
const polySynth = new Tone.PolySynth(4, Tone.Synth);

//effects
const reverb = new Tone.Freeverb(0.5).connect(vol);
const vibrato = new Tone.Vibrato(3,0.3).connect(reverb);

const sampler = new Tone.Players({
    "kick": "https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/kick.mp3",
    "snare": "https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/snare.mp3",
    "hihat": "https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/hh.mp3"
}, function () {
    //console.log("loaded");
});

//connect polysynth and sampler to vibrato/last effect
polySynth.connect(vibrato);
sampler.connect(vibrato);

const go = () => {
    // sampler.get("hihat").start();

    Tone.context.latencyHint = "fastest";
    Tone.Transport.bpm.value = 120;

    const seq = new Tone.Sequence(function(time, idx)
    {
        eval(editor.getValue());
    }, 
        [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], "8n");

    Tone.Transport.start('+0.2');
    seq.start();
}

const stop = () => {
    Tone.Transport.stop();
}