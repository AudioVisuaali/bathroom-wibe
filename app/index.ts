import { Ambient } from "./Ambient";
import { createConfig } from "./config/config";
import { HUEMotionSensor } from "./hue/HUESensorMotion";
import { createHUEClient } from "./hue/hueClient";
import { getFoundPlayer } from "./player";
import { Sound } from "./Sound";
import { sound } from "./sounds";

console.log(`Found player: ${getFoundPlayer()}`);
console.log(`Current time: ${new Date().toLocaleTimeString()}`);

const config = createConfig();

const hueClient = createHUEClient({ configHUE: config.hue });
const ambient = new Ambient();
new HUEMotionSensor({
	hueClient,
	sensorId: config.hue.sensors.bathroom,
	onUpdate: (state) => {
		if (state.presence) {
			ambient.start();
		} else {
			ambient.end();
		}
	},
});

console.log("Waiting for input...");

const notification = new Sound(sound.notification);
notification.play();
