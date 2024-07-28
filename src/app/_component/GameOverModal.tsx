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
	setIsStart,
	open,
	setOpen,
}: {
	setIsStart: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const gameOver = () => {
		// console.log("ゲームオーバー");
		setIsStart(false);
		setOpen(false);
	};

	return (
		<Modal
			centered
			opened={open}
			onClose={() => {}}
			withCloseButton={false}
			closeOnClickOutside={false}
		>
			<Stack>
				<Text mb={16}>
					３回失敗したので残念です、
					<br />
					ゲームオーバーになりました
				</Text>

				<Button onClick={gameOver}>最初に戻る</Button>
			</Stack>
		</Modal>
	);
};
