import { Ambient } from "./Ambient";
import { createConfig } from "./config/config";
import { HUEMotionSensor } from "./hue/HUESensorMotion";
import { createHUEClient } from "./hue/hueClient";
import { Notification } from "./Notification";

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

const notification = new Notification();
notification.notify();
