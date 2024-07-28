"use client";

import { Button, Container, Modal, Text, Title } from "@mantine/core";

/**
 * ゲーム開始時に表示するモーダル
 *
 * @component
 * @param {boolean} setIsStart - ゲームを開始する
 * @returns
 */
export const GameStartModal = ({
	setIsStart,
}: {
	setIsStart: () => void;
}) => {
	return (
		<Modal withCloseButton={false} opened={true} onClose={() => {}}>
			<Container>
				<Title fz={{ base: 24, md: "h2" }}>まいこの数独アプリ</Title>

				<Text my={16}>
					数独は、1から9までの数字を使って、
					<br />
					各行、各列、各3×3のブロックに、
					<br />
					それぞれ1から9までの数字を1回ずつだけ入れて、
					<br />
					すべてのマスを埋めるパズルです。
				</Text>

				<Button onClick={setIsStart}>ゲームスタート</Button>

				<Text c="pink" fw={"bold"} my={16}>
					難易度設定は開発中~
				</Text>
			</Container>
		</Modal>
	);
};
