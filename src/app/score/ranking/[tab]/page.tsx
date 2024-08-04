import { Button, Container, Group, Paper, Title } from "@mantine/core";
import ScoreBoard from "./client";
import Link from "next/link";
import { TbArrowBackUp } from "react-icons/tb";

const dscoreList = [
	{
		id: 1,
		level: "easy",
		time: 600,
		date: "2021-01-01",
	},
	{
		id: 2,
		level: "easy",
		time: 600,
		date: "2021-01-01",
	},
	{
		id: 3,
		level: "easy",
		time: 600,
		date: "2021-01-01",
	},
	{
		id: 4,
		level: "easy",
		time: 600,
		date: "2021-01-01",
	},
	{
		id: 5,
		level: "easy",
		time: 600,
		date: "2021-01-01",
	},
	{
		id: 6,
		level: "easy",
		time: 600,
		date: "2021-01-01",
	},
	{
		id: 7,
		level: "easy",
		time: 600,
		date: "2021-01-01",
	},
	{
		id: 8,
		level: "easy",
		time: 600,
		date: "2021-01-01",
	},
	{
		id: 9,
		level: "easy",
		time: 600,
		date: "2021-01-01",
	},
	{
		id: 10,
		level: "easy",
		time: 600,
		date: "2021-01-01",
	},
];

// TODO: ランキング機能(自分のスコアがランキングに表示される)
export default function ScorePage({ params }: { params: { tab: string } }) {
	//認証機能を追加する際には、このページを認証済みのユーザーのみがアクセスできるようにする
	const scoreList = dscoreList;

	return (
		<Container size={"sm"} my={20}>
			<Paper p={"md"} shadow={"xs"}>
				<Group justify={"space-between"} mb={20}>
					<Title order={1}>ランキング</Title>

					<Button component={Link} href="/score" leftSection={<TbArrowBackUp />}>
						スコア
					</Button>
				</Group>

				<ScoreBoard value={params.tab} scores={scoreList} />
			</Paper>
		</Container>
	);
}
