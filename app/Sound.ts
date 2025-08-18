import playSound, { type Player } from "play-sound";
import type { SoundMetadata } from "./sounds";

export class Sound {
	private player: Player | null;
	private sound: SoundMetadata;

	constructor(sound: SoundMetadata) {
		this.sound = sound;
		this.player = null;
	}

	public play(startAtSeconds: number = 0) {
		const instance = playSound();
		const options = {
			players: ["afplay", "play"],
			afplay: [],
			play: ["trim", `${startAtSeconds}`],
		};

		this.player = instance.play(this.sound.path, options, (err) => {
			if (err) {
				console.error("Error playing sound:", err);
			}
		});
	}

	public end() {
		if (!this.player) {
			return;
		}

		this.player.kill();
	}
}
