"use client";

import { Group, Text } from "@mantine/core";

/**
 * ゲームの進行状況を表示するコンポーネント
 *
 * @component
 * @param {boolean} setIsStart - ゲームを開始する
 * @returns
 */
export const GameProgress = ({
	errorCells,
	timeElapsed,
}: {
	errorCells: string[];
	timeElapsed: number;
}) => {
	const formatTime = (seconds: number): string => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${String(minutes).padStart(2)}:${String(secs).padStart(2, "0")}`;
	};

	return (
		<Group
			p={8}
			justify="right"
			my={8}
			style={{ boxShadow: "0 0 4px #7e7e7e", borderRadius: 4 }}
		>
			<Text>ミス数: {errorCells.length}/3</Text>
			<Text>経過時間:{formatTime(timeElapsed)}秒</Text>
		</Group>
	);
};
