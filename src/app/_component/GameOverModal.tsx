"use client";

import { Button, Modal, Stack, Text } from "@mantine/core";

/**
 * ゲームオーバー時に表示するモーダル
 *
 * @component
 * @param {boolean} isStart - ゲームが開始しているかどうか
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsStart - ゲームの開始状態を更新する関数
 * @param {boolean} open - モーダルを開くかどうか
 * @returns
 */
export const GameOverModal = ({
	status,
}: {
	status: boolean;
}) => {
	const gameOver = () => window.location.reload();

	return (
		<Modal
			centered
			opened={status}
			onClose={() => {}}
			withCloseButton={false}
			closeOnClickOutside={false}
		>
			<Stack>
				<Text mb={16}>
					残念ですが、３回失敗したので
					<br />
					ゲームオーバーになりました
				</Text>

				<Button onClick={gameOver}>最初に戻る</Button>
			</Stack>
		</Modal>
	);
};
