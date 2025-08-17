import { Ambient } from "./Ambient";
import { createConfig } from "./config/config";
import { createHUEClient } from "./hue/hueClient";
import { HUEMotionSensor } from "./hue/HUESensorMotion";

const config = createConfig();

const hueClient = createHUEClient({ configHUE: config.hue });
const ambient = new Ambient();
const sensor = new HUEMotionSensor({
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

ambient.start();
setTimeout(() => {
	ambient.end();
}, 1000);
console.log("Configuration initialized:", config);
