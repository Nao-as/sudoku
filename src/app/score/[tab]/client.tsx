"use client";

import cx from "clsx";
import { ScrollArea, Table, Tabs } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import classes from "./client.module.css";
import { formatTime } from "@/util/util";
import type { GameMode, GameScore } from "@/types/game";

type Props = {
	mode: GameMode;
	scores: GameScore[];
};

/**
 * スコアボード
 *
 * @param {string} mode - 難易度
 * @param {object[]} scores - スコアのリスト
 * @returns
 */
export default function ScoreBoard({ mode, scores }: Props) {
	const [scrolled, setScrolled] = useState(false);
	const router = useRouter();

	return (
		<>
			<Tabs variant="outline" value={mode} onChange={(v) => router.push(`/score/${v}`)} mb={16}>
				<Tabs.List>
					<Tabs.Tab value="easy" px={30} w={"33%"}>
						簡単
					</Tabs.Tab>
					<Tabs.Tab value="normal" px={30} w={"33%"}>
						ふつう
					</Tabs.Tab>
					<Tabs.Tab value="difficult" px={30} w={"33%"}>
						難しい
					</Tabs.Tab>
				</Tabs.List>
			</Tabs>

			<ScrollArea h={400} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
				<Table withTableBorder withColumnBorders>
					<Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
						<Table.Tr>
							<Table.Td>時間</Table.Td>
							<Table.Td>ミス数</Table.Td>
							<Table.Td>日付</Table.Td>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{scores.map((data) => (
							<Table.Tr key={data.id}>
								<Table.Td>{formatTime(data.time)}</Table.Td>
								<Table.Td>{0}回</Table.Td>
								<Table.Td>{data.created_at}</Table.Td>
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			</ScrollArea>
		</>
	);
}
