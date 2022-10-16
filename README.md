# cvsoundjs

CV SOUND OS7 DEMO

This project is based on a previous project written in ActionScript 3 in 2010.
The idea is to use the Web Audio API to output the generated sound by playing an endless looping buffer.
The source for the audio buffer is the sound chip emulation rendering of the sound routines based on the ColecoVision game system BIOS.
The music data samples are extracted from various sources, including commercial ColecoVisionn games released in 1982-1983.

Technical details

Web Audio API (+Gain) <- Audio Source (buffer) <- Sound Chip Emulation <- Coleco Vision BIOS sound routines <- Music data.
#javascript #html #emulator #8bit #sound #chiptune
