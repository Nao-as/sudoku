"use client";

import { Flex, Group, rem, Text } from "@mantine/core";
import { TbClock } from "react-icons/tb";

/**
 * ゲームの進行状況を表示するコンポーネント
 *
 * @component
 * @param {boolean} setIsStart - ゲームを開始する
 * @returns
 */
export const GameProgress = ({
	mode,
	errorCells,
	timeElapsed,
}: {
	mode: "easy" | "normal" | "hard";
	errorCells: number;
	timeElapsed: number;
}) => {
	const formatTime = (seconds: number): string => {
		const minutes = Math.floor(seconds / 60);
		const sec = seconds % 60;
		return `${String(minutes).padStart(2)}:${String(sec).padStart(2, "0")}`;
	};

	return (
		<Group
			p={8}
			justify="space-between"
			my={8}
			style={{ boxShadow: "0 0 4px #7e7e7e", borderRadius: 4 }}
		>
			<Text>
				{mode === "easy"
					? "かんたん"
					: mode === "normal"
						? "ふつう"
						: "むずかしい"}
			</Text>
			<Group>
				<Text>ミス数: {errorCells}/3</Text>
				<Flex align={"center"} gap={4}>
					<TbClock style={{ width: rem(18), height: rem(18) }} />
					{formatTime(timeElapsed)}秒
				</Flex>
			</Group>
		</Group>
	);
};
