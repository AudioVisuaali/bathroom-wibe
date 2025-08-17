import { Ambient } from "./Ambient";
import { createConfig } from "./config/config";
import { HUEMotionSensor } from "./hue/HUESensorMotion";
import { createHUEClient } from "./hue/hueClient";
import { Notification } from "./Notification";
import { getFoundPlayer } from "./player";

const player = getFoundPlayer();
console.log("Found player:", player);

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

console.log("Wibing");
ambient.start();

const notification = new Notification();
notification.notify();
