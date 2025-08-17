import path from "node:path";
import playSound, { type Player } from "play-sound";

export class Ambient {
	private player: Player | null;
	private clearTimeout: NodeJS.Timeout | null = null;

	constructor() {
		this.player = null;
	}

	public start() {
		if (this.player) {
			return;
		}
		const instance = playSound();
		const filename = path.join(__dirname, "../sounds/meditative-1.mp3");
		const startAt = getRandom();

		const options = {
			afplay: ["-t", String(startAt)],
			// Magic number(audio frames) for mpg321 to start at a specific time in seconds
			mpg321: ["-k", String(startAt * Math.floor(38.28))],
		};

		this.player = instance.play(filename, options, (err) => {
			if (err) {
				console.error("Error playing sound:", err);
			} else {
				console.log("Ambient sound is playing");
			}
			this.player = null;
		});
	}

	private clearPlayer() {
		if (this.clearTimeout) {
			clearTimeout(this.clearTimeout);
			this.clearTimeout = null;
		}

		if (this.player) {
			this.player.kill();
			this.player = null;
		}
	}

	public end() {
		this.clearTimeout = setTimeout(this.clearPlayer, 30_000);
	}
}

function getRandom(min = 10, max = 120): number {
	const randomStart = Math.floor(Math.random() * (max - min + 1)) + min;
	console.log(randomStart);
	return randomStart;
}
