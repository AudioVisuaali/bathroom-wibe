import path from "node:path";
import playSound from "play-sound";

export class Notification {
	public notify() {
		const instance = playSound();
		const filename = path.join(__dirname, "../sounds/notification.mp3");

		console.log("Playing notification sound...");
		instance.play(filename, {}, (err) => {
			if (err) {
				console.error("Error playing sound:", err);
			}
		});
	}
}
