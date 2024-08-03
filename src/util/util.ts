export const formatTime = (seconds: number): string => {
	const minutes = Math.floor(seconds / 60);
	const sec = seconds % 60;
	return `${String(minutes).padStart(2)}:${String(sec).padStart(2, "0")}`;
};
