declare module "play-sound" {
	export type KillFunction = () => void;

	export type Player = {
		kill: KillFunction;
	};

	type PlayParams = {
		afplay?: string[];
		mpg321?: string[];
	};

	export class Instance {
		play: (
			file: string,
			params: PlayParams,
			callback: (error?: Error) => void,
		) => Player;
	}
	function playSound(): Instance;
	export default playSound;
}
