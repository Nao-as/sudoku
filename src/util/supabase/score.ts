import type { CalcrateScore, GameMode, GameScore, GameScoress, TotalScore } from "@/types/game";
import { supabase } from "./init";

/** スコアを登録する */
export const createScore = async (data: GameScoress): Promise<boolean> => {
	const { error } = await supabase.from("scores").insert([
		{
			user_id: data.userId, // ユーザーID
			mode: data.mode, // 難易度
			time: data.time,
			miss_count: data.missCount,
		},
	]);

	if (error) {
		console.error("Error inserting data:", error.message);
		throw new Error("Error inserting data");
	}

	return true;
};

/** 対象難易度から平均値・最大・最小・回数を集計する */
export const getCalcrateScore = async (mode: GameMode, userId = 1): Promise<CalcrateScore> => {
	const modeValue = mode.replace(/'/g, "''"); // SQLインジェクション対策

	const { data, error } = await supabase.rpc("get_aggregates", {
		p_user_id: userId, // ユーザーID
		p_mode: modeValue,
	});

	if (error) {
		console.error("Error executing SQL:", error.message);
		throw new Error("Error executing SQL");
	}

	return {
		gameCount: data.game_count,
		averageTime: data.average_time,
		minTime: data.min_time,
		maxTime: data.max_time,
	};
};

/** 難易度の統計スコアを更新する */
export const createTotalScore = async ({
	userId,
	mode,
	scores,
}: { userId: number; mode: GameMode; scores: CalcrateScore }): Promise<boolean> => {
	const { data, error } = await supabase
		.from("total_scores")
		.update([
			{
				user_id: userId, // ユーザーID
				mode: mode, // 難易度
				game_count: scores.gameCount,
				average_time: Math.floor(scores.averageTime), // 整数にする
				min_time: scores.minTime,
				max_time: scores.maxTime,
			},
		])
		.eq("user_id", userId)
		.eq("mode", mode);

	if (error) {
		console.error("Error inserting data:", error.message);
		throw new Error("Error inserting data");
	}

	return true;
};

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
