declare module "play-sound" {
	export type KillFunction = () => void;

	export type Player = {
		kill: KillFunction;
	};

	type PlayParams = {
		afplay?: string[];
		mpg123?: string[];
		mpg321?: string[];
	};

	export class Instance {
		play: (
			file: string,
			params: PlayParams,
			callback: (error: Error | null) => void,
		) => Player;
	}
	function playSound(params?: { players?: string[] }): Instance;
	export default playSound;
}
