/**
 * @file Speaker class
 * @copyright Amy Bienvenu 2010
 * @author Amy Bienvenu <amy.bienvenu@outlook.com>
 * @version 0.1
 * @summary WebAudio API magic?
 */

const SAMPLERATE = 22050;
const BUFFERSIZE = 2205*4;
const BUFFERINTERVAL = BUFFERSIZE * 1000.0 / SAMPLERATE;
const TIMEUNIT_WAVE = 1.0 / SAMPLERATE;

var audioContext = null; // 
var buffer = null;
var chData = null;
var wnSource;
var primaryGainControl;

var snd; //:SoundChip
var speakerTimer = null; 

var toggleTick = true;
var self = null;

class Speaker 
{
   constructor(sndchip) { 
      snd = sndchip;
      self = this;
   }

   play() {
      if (audioContext!=null) return 0;
      audioContext = new (window.webkitAudioContext || window.AudioContext)();

      buffer = audioContext.createBuffer(
         1,
         BUFFERSIZE*2,
         SAMPLERATE
         );

      chData = buffer.getChannelData(0);

      primaryGainControl = audioContext.createGain();
      primaryGainControl.gain.setValueAtTime(0.5,0);
      primaryGainControl.connect(audioContext.destination);

      this.tick();

      wnSource = audioContext.createBufferSource();
      wnSource.buffer = buffer;
      wnSource.loop = true;
      wnSource.connect(primaryGainControl);
      
      window.setTimeout(() => {
         speakerTimer = setInterval(this.tick,BUFFERINTERVAL)
      },BUFFERINTERVAL/2);
      wnSource.start();
   }

   tick() {
      toggleTick=!toggleTick;
      if (toggleTick) self.tack(); else self.tock();
   }

   tack() {
      for (let c = 0; c < BUFFERSIZE; c++ ) {
         chData[c] = snd.output();
         sndchip.update(TIMEUNIT_WAVE);
      }
   }

   tock() {
      for (let c = 0; c < BUFFERSIZE; c++ ) {
         chData[BUFFERSIZE+c] = snd.output();
         sndchip.update(TIMEUNIT_WAVE);
      }
   }   

}
