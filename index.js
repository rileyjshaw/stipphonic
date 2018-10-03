'use strict';

/**
 * Stippling, applied to musical chords.
 *
 * Works best with MIDI keyboards, but you can use your computer keyboard too!
 *
 * Usage:
 *  > npm i
 *  > node index.js
 *
 *  Then open a DAW like GarageBand or Ableton and hook the "Stipphonic" MIDI
 *  instrument up to some sound! Turn up the volume and hold some chords :)
 */
const inquirer = require('inquirer');
const midi = require('midi');

// Helpers
const isType = a => ({type}) => type === a;
const bye = msg => {
	console.error(msg);
	process.exit(1);
};

// Set up a new MIDI input.
const input = new midi.input();
const numInputs = input.getPortCount();
const instrumentChoices = Array.from({length: numInputs}, (_, i) => ({
	name: input.getPortName(i),
	value: i,
}));

if (!instrumentChoices.length) {
	bye('Please plug in a MIDI instrument.');
}

const questions = [
	{
		name: 'instrument',
		type: 'list',
		message: 'Which instrument do you want to use?',
		choices: instrumentChoices,
	},
	{
		name: 'duration',
		type: 'input',
		message: 'What should the note duration be?',
		default: 80,
	},
];

// Set up a new output and create a virtual Stipphonic instrument with it.
const output = new midi.output();
output.openVirtualPort('Stipphonic');

// Kick off the questions!
inquirer.prompt(questions).then(({
	instrument,
	duration,
}) => {
	// Listen to stdin for ctrl-c, ctrl-d, and esc.
	const {stdin} = process;
	stdin.setRawMode(true);
	stdin.resume();
	stdin.setEncoding('utf8');
	stdin.on('data', key => {
		if (['\u0003', '\u0004', '\u001b'].includes(key)) {process.exit();}
	});
	console.log('\nYou can exit at any time by hitting the Esc key.\n');

	// If they chose MIDI, open the port and trigger on "noteOn" signals.
	input.openPort(instrument);
	input.on('message', (_, [status, note, velocity]) => {
		if (status === 0x80) {delete notesHeld[note];}
		if (status === 0x90 && velocity) {notesHeld[note] = velocity;}
	});

	setInterval(() => {
		// notesHeld.entries().filter(([note]) => notesPlaying.indexOf(note) === -1)
		const notesHeldEntries = [];
		for (var property in notesHeld) {
			if (notesHeld.hasOwnProperty(property) && notesPlaying.indexOf(property) === -1) {
				notesHeldEntries.push([property, notesHeld[property]]);
			}
		}

		notesHeldEntries
			.forEach(([note, velocity]) => {
				velocity /= 127;
				// velocity *= velocity;
				if (Math.random() < velocity) {
					notesPlaying.push(note);
					output.sendMessage([0x90, note, 4]);
					setTimeout(() => {
						output.sendMessage([0x80, note, 0]);
						notesPlaying.splice(notesPlaying.indexOf(note), 1);
					}, duration);
				}
			});
	}, 0);
});

const notesHeld = {};  // Note values that are currently held down by your fingers.
const notesPlaying = [];  // Note values that are currently "held down" by the software.
