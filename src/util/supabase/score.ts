import type { GameMode, GameScore, TotalScore } from "@/types/game";
import { supabase } from "./init";

// スコアを登録する
export const createScore = async () => {};

// 登録したスコアからゲームスコアを再更新する
export const calcrateScore = async (mode: GameMode) => {};

// すべてのスコアを難易度から一覧を取得
export const getTotalScores = async (mode: GameMode): Promise<GameScore[]> => {
	const { data, error } = await supabase
		.from("scores")
		.select("*")
		.eq("user_id", 1)
		.eq("mode", mode)
		.order("id", { ascending: false });

	if (error) return [];

	return data;
};

// 各ジャンルのスコアを取得
export const getModeToal = async (): Promise<TotalScore[]> => {
	const { data, error } = await supabase
		.from("total_scores")
		.select("*")
		.eq("user_id", 1)
		.order("id", { ascending: true });

	if (error) return [];

	return data.map((d) => {
		return {
			mode: d.mode,
			gameCount: d.game_count,
			averageTime: d.average_time,
			minTime: d.min_time,
			maxTime: d.max_time,
		};
	});
};
