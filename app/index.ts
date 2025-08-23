import { Ambient } from "./Ambient";
import { createConfig } from "./config/config";
import { HUEMotionSensor } from "./hue/HUESensorMotion";
import { createHUEClient } from "./hue/hueClient";
import { Sound, validatePlayerExists } from "./Sound";
import { sound } from "./sounds";
import { getTimeFinland } from "./time";

console.log(`Player exists: ${validatePlayerExists()}`);
console.log(`Current time: ${getTimeFinland().toLocaleTimeString()}`);

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
