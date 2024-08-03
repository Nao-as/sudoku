"use client";

import cx from "clsx";
import { ScrollArea, Table, Tabs } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import classes from "./client.module.css";

type Props = {
	value: string;
	scores: {
		id: number;
		level: string;
		time: number;
		date: string;
	}[];
};

/**
 * スコアボード
 *
 * @param {string} value - 難易度
 * @param {object[]} scores - スコアのリスト
 * @returns
 */
export default function ScoreBoard({ value, scores }: Props) {
	const [scrolled, setScrolled] = useState(false);
	const router = useRouter();

	return (
		<>
			<Tabs
				variant="outline"
				value={value}
				onChange={(value) => router.push(`/score/ranking/${value}`)}
				mb={16}
			>
				<Tabs.List>
					<Tabs.Tab value="easy" px={30} w={"33%"}>
						簡単
					</Tabs.Tab>
					<Tabs.Tab value="normal" px={30} w={"33%"}>
						ふつう
					</Tabs.Tab>
					<Tabs.Tab value="hard" px={30} w={"33%"}>
						難しい
					</Tabs.Tab>
				</Tabs.List>
			</Tabs>

			<ScrollArea h={400} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
				<Table withTableBorder withColumnBorders>
					<Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
						<Table.Tr>
							<Table.Td>難易度</Table.Td>
							<Table.Td>時間</Table.Td>
							<Table.Td>ミス数</Table.Td>
							<Table.Td>日付</Table.Td>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{scores.map((data) => (
							<Table.Tr key={data.id}>
								<Table.Td>
									{data.level === "easy" ? "簡単" : data.level === "normal" ? "普通" : "難しい"}
								</Table.Td>
								<Table.Td>{data.time}</Table.Td>
								<Table.Td>{0}回</Table.Td>
								<Table.Td>{data.date}</Table.Td>
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			</ScrollArea>
		</>
	);
}
