"use client";

import {
	Button,
	Flex,
	Modal,
	Radio,
	RadioGroup,
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
		<Modal.Root opened={true} onClose={() => {}}>
			<Modal.Overlay />
			<Modal.Content
				p={{
					base: 12,
					md: 24,
				}}
			>
				<Modal.Body>
					<Title fz={{ base: 24, md: "h2" }}>数独アプリ</Title>

					<Text my={16}>
						数独は、1から9までの数字を使って、
						<br />
						各行、各列、各3×3のブロックに、
						<br />
						それぞれ1から9までの数字を1回ずつだけ入れて、
						<br className="sp-br" />
						すべてのマスを埋めるパズルです。
					</Text>

					<RadioGroup
						value={value}
						onChange={setValue}
						label="難易度を選んでね"
						my={24}
					>
						<Flex
							gap={8}
							my={8}
							direction={{
								base: "column",
								md: "row",
							}}
						>
							<Radio label="かんたん" value="easy" />
							<Radio label="ふつう" value="normal" />
							<Radio label="むずかしい" value="hard" />
						</Flex>
					</RadioGroup>

					<Button onClick={handleStart}>ゲームスタート</Button>
				</Modal.Body>
			</Modal.Content>
		</Modal.Root>
	);
};
