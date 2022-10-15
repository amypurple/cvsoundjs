// entry point
engine = new SoundEngine();
soundchip = new SoundChip(engine,59.94); // 59.94 = NTSC, 50 = PAL
const button = document.createElement('button');
button.innerText = 'GO!';
button.onclick = () => {
   speakers = new Speaker(soundchip);
   document.body.removeChild(button);
   speakers.play();
   engine.demoSelection();
}
document.body.appendChild(button);