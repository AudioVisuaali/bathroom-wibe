import { z } from "zod";
import { HUEClient } from "./hueClient";
import { toFailure, toSuccess } from "../validation";

type OnUpdateFunction = (state: State) => void;

type State = {
	presence: boolean;
	lastUpdated: Date;
};

type HUEMotionSensorParams = {
	hueClient: HUEClient;
	sensorId: string;
	onUpdate?: OnUpdateFunction;
};

export class HUEMotionSensor {
	private sensorId: string;
	private hueClient: HUEClient;
	private onUpdate?: OnUpdateFunction;

	private state: State;

	constructor({ hueClient, onUpdate, sensorId }: HUEMotionSensorParams) {
		this.hueClient = hueClient;
		this.onUpdate = onUpdate;
		this.sensorId = sensorId;
		this.state = {
			presence: false,
			lastUpdated: new Date(0),
		};
		setInterval(this.handleTick, 1000);
	}

	private handleTick = async () => {
		const result = await this.getData();
		if (!result.success) {
			console.error("Failed to get sensor data:", result.failure);
			return;
		}

		const hasUpdated = this.state.presence !== result.value.state.presence;

		this.state = {
			presence: result.value.state.presence,
			lastUpdated: result.value.state.lastupdated,
		};

		if (hasUpdated && this.onUpdate) {
			this.onUpdate(this.state);
		}
	};

	private getData = async () => {
		try {
			const result = await this.hueClient.get(`/sensors/${this.sensorId}`);

			const parsed = ResponseSchema.safeParse(result.data);
			if (!parsed.success) {
				return toFailure(
					new Error(`Failed to parse response: ${parsed.error.message}`),
				);
			}
			return toSuccess(parsed.data);
		} catch (error) {
			return toFailure(error as Error);
		}
	};
}

const ResponseSchema = z.object({
	state: z.object({
		presence: z.boolean(),
		lastupdated: z.coerce.date(),
	}),
});
