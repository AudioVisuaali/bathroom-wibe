import findExec from "find-exec";
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
		const instance = playSound({ players: ["mpg123"] });

		this.player = instance.play(
			this.sound.path,
			{ mpg123: ["-k", `${startAtSeconds * 38}`] },
			this.handleFinish,
		);
	}

	private handleFinish(error: Error | null) {
		if (error) {
			console.error("Error playing sound:", error);
		}
	}

	public end() {
		if (!this.player) {
			return;
		}

		this.player.kill();
	}
}

export function validatePlayerExists() {
	const result = findExec(["mpg123"]);
	if (!result) {
		throw new Error(
			"mpg123 not found, please install it to use this application",
		);
	}
	return result;
}
