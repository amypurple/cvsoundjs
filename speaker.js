/**
 * @file Speaker class
 * @copyright Amy Bienvenu 2010
 * @author Amy Bienvenu <amy.bienvenu@outlook.com>
 * @version 0.1
 * @summary WebAudio API magic?
 */

const SAMPLERATE = 22050;
const BUFFERSIZE = 1.5*SAMPLERATE;
const TIMEUNIT_WAVE = 1.0 / SAMPLERATE;

var audioContext = null; // 
var buffer;
var chData;
var wnSource;
var primaryGainControl;

var snd; //:SoundChip

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
         BUFFERSIZE,
         SAMPLERATE
         );

      chData = buffer.getChannelData(0);

      primaryGainControl = audioContext.createGain();
      primaryGainControl.gain.setValueAtTime(0.5,0);
      primaryGainControl.connect(audioContext.destination);

      this.tick();
   }

   tick() {
      for (let c = 0; c < BUFFERSIZE; c++ ) {
         chData[c] = snd.output();
         sndchip.update(TIMEUNIT_WAVE);
      }
      wnSource = audioContext.createBufferSource();
      wnSource.buffer = buffer;
      wnSource.connect(primaryGainControl);
      wnSource.start();
      wnSource.onended = () => {
         this.tick();
      }     
   };
}
