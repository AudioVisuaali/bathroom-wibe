export function getTimeFinland() {
	return new Date(
		new Date().toLocaleString("en-US", { timeZone: "Europe/Helsinki" }),
	);
}
