"use client";

import {
	Button,
	Container,
	Flex,
	Modal,
	Radio,
	RadioGroup,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import { useState } from "react";

/**
 * ゲーム開始時に表示するモーダル
 *
 * @component
 * @param {boolean} setIsStart - ゲームを開始する
 * @returns
 */
export const GameStartModal = ({
	setIsStart,
	setMode,
}: {
	setIsStart: () => void;
	setMode: (mode: "easy" | "normal" | "hard") => void;
}) => {
	const [value, setValue] = useState("easy");

	const handleStart = () => {
		setIsStart();
		setMode(value as "easy" | "normal" | "hard");
	};

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

				<RadioGroup
					value={value}
					onChange={setValue}
					label="難易度"
					required
					my={24}
				>
					<Flex gap={8} my={8}>
						<Radio label="かんたん" value="easy" />
						<Radio label="ふつう" value="normal" />
						<Radio label="むずかしい" value="hard" />
					</Flex>
				</RadioGroup>

				<Button onClick={handleStart}>ゲームスタート</Button>

				{/* <Text c="pink" fw={"bold"} my={16}>
					難易度設定は開発中~
				</Text> */}
			</Container>
		</Modal>
	);
};
