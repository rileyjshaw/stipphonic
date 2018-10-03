Stipphonic
========

I wanted to see what stippling sounded like applied to musical chords. Adapted from [Virtuoso](https://github.com/rileyjshaw/virtuoso).

**Requires Node.js v6.0.0 or higher, but fails above v9.**

## Installation

```bash
git clone https://github.com/rileyjshaw/stipphonic.git
cd stipphonic
npm i
```

## Usage

```bash
node index.js
```

Then open a DAW like GarageBand or Ableton and hook the "Stipphonic" MIDI
instrument up to some sound! Turn up the volume and mash some keys :)

The repo is pre-loaded with Mozart's "Rondo alla Turca", but you can use your
own MIDI file by passing it as an argument to the launcher:

```bash
node index.js ./star_wars.mid
```

## Related works

 - Stephen Malinowski's "The Conductor Program"
 - Batuhan Bozkurt's "Touch Pianist"
 - Smule's "Magic Piano"
 - Simone Masiero's "Hacker Typer"

## Notes

 - If you're using GarageBand, you'll want to hijack & block your actual MIDI
 instrument's stream so that you don't get double notes. I included a [sample
 MidiPipe configuration](./block_keyboard.mipi) that does the trick. [You can
 download MidiPipe here](http://www.subtlesoft.square7.net/MidiPipe.html).

-------------------------------------------------------------------------------

Licensed under
[MIT](https://github.com/rileyjshaw/stipphonic/blob/master/LICENSE).

Created by [rileyjshaw](http://rileyjshaw.com/).
