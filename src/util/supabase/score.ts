import { supabase } from "./init";

type GameScore = {
	id: number;
	time: number;
	miss_count: number;
	created_at: string;
};

// スコアを登録する
export const createScore = async () => {};

// すべてのスコアを難易度から一覧を取得
export const getTotalScores = async (
	mode: "easy" | "normal" | "difficult",
): Promise<GameScore[]> => {
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
export const getModeToal = async () => {
	const { data, error } = await supabase.from("total_scores").select("*").eq("user_id", 1);

	if (error) return [];

	return data;
};
