export type GameMode = "easy" | "normal" | "hard";

export type GameScore = {
	id: number;
	time: number;
	miss_count: number;
	created_at: string;
};

export type TotalScore = {
	mode: GameMode;
	averageTime: number;
	maxTime: number;
	minTime: number;
	gameCount: number;
};
