import { Sound } from "./Sound";
import { getSoundRandomStartingPoint, sound } from "./sounds";

export class Ambient {
	private sound: Sound | null;
	private timeout: NodeJS.Timeout | null = null;

	constructor() {
		this.sound = null;
	}

	public start() {
		this.clearTimeout();

		if (this.sound) {
			return;
		}

		const { sound, startAt } = getSound();

		this.sound = sound;
		this.sound.play(startAt);
	}

	private clearTimeout() {
		if (!this.timeout) {
			return;
		}

		console.info("Clearing timeout");
		clearTimeout(this.timeout);
		this.timeout = null;
	}

	private clearPlayer = () => {
		console.info("Clearing ambient player");

		if (this.sound) {
			console.info("Killing player");
			this.sound.end();
			this.sound = null;
		}
	};

	public end() {
		this.timeout = setTimeout(() => {
			this.clearPlayer();
			this.clearTimeout();
		}, 120_000);
	}
}

type SoundWithOptions = {
	sound: Sound;
	startAt: number;
};

function getSound(): SoundWithOptions {
	if (isTimeForEyeOfTheTiger()) {
		return {
			sound: new Sound(sound.eyeOfTheTiger),
			startAt: 0,
		};
	}

	return {
		sound: new Sound(sound.meditative),
		startAt: getSoundRandomStartingPoint(sound.meditative),
	};
}

let letTimeEyeOfTheTigerWasPlayer: string | null = null;

function isTimeForEyeOfTheTiger() {
	const now = new Date();
	const currentDay = now.getDay();
	if (![1, 2, 3, 4, 5].includes(currentDay)) {
		return false;
	}

	const currentHour = now.getHours();
	if (!(currentHour === 18 || currentHour === 10 || currentHour === 18)) {
		return false;
	}

	if (now.toDateString() === letTimeEyeOfTheTigerWasPlayer) {
		return false;
	}

	letTimeEyeOfTheTigerWasPlayer = now.toDateString();
	return true;
}
