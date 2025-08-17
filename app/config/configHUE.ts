import { requireEnv } from "./getters";

export type ConfigHUE = {
	url: string;
	token: string;
	sensors: {
		bathroom: string;
	};
};

export function createConfigHUE(): ConfigHUE {
	return {
		url: requireEnv("HUE_ADDRESS"),
		token: requireEnv("HUE_TOKEN"),
		sensors: {
			bathroom: requireEnv("HUE_SENSOR_BATHROOM_ID"),
		},
	};
}
