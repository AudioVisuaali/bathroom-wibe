import axios, { type AxiosInstance } from "axios";
import { ConfigHUE } from "../config/configHUE";

export type HUEClient = AxiosInstance;

type CreateHUEClientParams = {
	configHUE: ConfigHUE;
};

export function createHUEClient({
	configHUE,
}: CreateHUEClientParams): HUEClient {
	return axios.create({
		baseURL: new URL(`/api/${configHUE.token}`, configHUE.url).href,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
