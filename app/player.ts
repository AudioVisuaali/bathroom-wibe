import findExec from "find-exec";

const players = [
	"mplayer",
	"afplay",
	"mpg123",
	"mpg321",
	"play",
	"omxplayer",
	"aplay",
	"cmdmp3",
	"cvlc",
	"powershell",
];

export function getFoundPlayer() {
	return findExec(players);
}
