import path from "node:path";

export type SoundMetadata = {
	path: string;
	durationSeconds: number;
};

export const sound: Record<string, SoundMetadata> = {
	eyeOfTheTiger: {
		path: createSoundPath("eye-of-the-tiger.mp3"),
		durationSeconds: 244,
	},
	meditative: {
		path: createSoundPath("meditative-1.mp3"),
		durationSeconds: 600,
	},
	notification: {
		path: createSoundPath("notification.mp3"),
		durationSeconds: 2,
	},
};

function createSoundPath(filename: string) {
	return path.join(__dirname, "../sounds", filename);
}

export function getSoundRandomStartingPoint(sound: SoundMetadata) {
	return getRandom(0, sound.durationSeconds * 0.7);
}

function getRandom(min = 10, max = 120): number {
	const randomStart = Math.floor(Math.random() * (max - min + 1)) + min;
	return randomStart;
}
