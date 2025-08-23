import path from "node:path";

export type SoundMetadata = {
	path: string;
	durationSeconds: number;
};

export const sound: Record<string, SoundMetadata> = {
	eyeOfTheTiger: {
		path: createSoundPath("eye-of-the-tiger.mp3"),
		durationSeconds: toSeconds({ minutes: 4, seconds: 4 }),
	},
	meditative: {
		path: createSoundPath("meditative-1.mp3"),
		durationSeconds: toSeconds({ minutes: 10 }),
	},
	lofi: {
		path: createSoundPath("lofi.mp3"),
		durationSeconds: toSeconds({ minutes: 40 }),
	},
	notification: {
		path: createSoundPath("notification.mp3"),
		durationSeconds: toSeconds({ seconds: 2 }),
	},
};

function createSoundPath(filename: string) {
	return path.join(__dirname, "../sounds", filename);
}

export function getSoundRandomStartingPoint(sound: SoundMetadata) {
	const multiplier =
		sound.durationSeconds < toSeconds({ minutes: 30 }) ? 0.7 : 0.9;
	return getRandom(0, sound.durationSeconds * multiplier);
}

function getRandom(min = 10, max = 120): number {
	const randomStart = Math.floor(Math.random() * (max - min + 1)) + min;
	return randomStart;
}

type ToSecondsParams = {
	seconds?: number;
	minutes?: number;
};

function toSeconds({ seconds = 0, minutes = 0 }: ToSecondsParams) {
	return seconds + minutes * 60;
}
