import path from "node:path";
import playSound, { type Player } from "play-sound";

export class Ambient {
	private player: Player | null;
	private timeout: NodeJS.Timeout | null = null;

	constructor() {
		this.player = null;
	}

	public start() {
		this.clearTimeout();

		if (this.player) {
			return;
		}
		const instance = playSound();
		const filename = path.join(__dirname, "../sounds/meditative-1.mp3");
		const startAt = getRandom();
		console.log(filename);

		const options = {
			afplay: [],
			// Magic number(audio frames) for mpg321 to start at a specific time in seconds
			mpg123: ["-k", String(Math.floor(startAt * 38.28)), "-b", String(4096)],
		};
		console.log(options);

		this.player = instance.play(filename, options, (err) => {
			if (err) {
				console.error("Error playing sound:", err);
			} else {
				console.log("Ambient sound is playing");
			}
		});
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

		if (this.player) {
			console.info("Killing player");
			this.player.kill();
			this.player = null;
		}
	};

	public end() {
		this.timeout = setTimeout(() => {
			this.clearPlayer();
			this.clearTimeout();
		}, 60_000);
	}
}

function getRandom(min = 10, max = 120): number {
	const randomStart = Math.floor(Math.random() * (max - min + 1)) + min;
	return randomStart;
}
