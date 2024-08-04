"use client";

import type { GameMode } from "@/types/game";
import { formatTime } from "@/util/util";
import { Button, Modal, Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";

/**
 * ゲームクリア時に表示するモーダル
 *
 * @component
 * @param {boolean} isStart - ゲームが開始しているかどうか
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsStart - ゲームの開始状態を更新する関数
 * @param {boolean} open - モーダルを開くかどうか
 * @returns
 */
export const GameClearModal = ({
	mode,
	timeElapsed,
	isGameComplete,
	setIsGameComplete,
}: {
	mode: GameMode;
	timeElapsed: number;
	isGameComplete: boolean;
	setIsGameComplete: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const router = useRouter();

	const gameClear = () => {
		setIsGameComplete(false);
		window.location.reload();
	};

	return (
		<Modal
			centered
			opened={isGameComplete}
			onClose={() => {}}
			withCloseButton={false}
			closeOnClickOutside={false}
		>
			<Stack>
				<Text mb={16}>
					{mode === "easy" ? "かんたん" : mode === "normal" ? "ふつう" : "むずかしい"}
					クリアおめでとう~!(^○^)
					<br />
					かかった時間は {formatTime(timeElapsed)} です
				</Text>

				<Button onClick={gameClear}>最初に戻る</Button>
			</Stack>
		</Modal>
	);
};
