"use server";

import type { GameMode } from "@/types/game";
// import { createScore, createTotalScore, getCalcrateScore } from "@/util/supabase/score";

type s = {
	time: number;
	missCount: number;
	mode: GameMode;
};

/** ゲームクリア,ゲームオーバー時に実行*/
export const gameComplete = async (data: s) => {
	// // ゲーム結果を登録
	// const cs = createScore(data);

	// // 対象難易度を集計
	// const cdd = getCalcrateScore(data.mode);

	// // 集計スコアを登録
	// const csss = createTotalScore(cdd);
	console.log("hello", data);

	return "ok";
};
