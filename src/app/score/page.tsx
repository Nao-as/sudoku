import { formatTime } from "@/util/util";
import {
	Button,
	Container,
	Flex,
	Group,
	Paper,
	Tabs,
	TabsList,
	TabsPanel,
	TabsTab,
	Text,
	Title,
} from "@mantine/core";
import Link from "next/link";
import { TbHome2, TbScoreboard } from "react-icons/tb";

const dscores = [
	{
		level: "easy",
		count: 12,
		averageTime: 500,
		maxTime: 1200,
		minTime: 300,
		date: "2021-01-01",
	},
	{
		level: "normal",
		count: 20,
		averageTime: 500,
		maxTime: 1100,
		minTime: 300,
		date: "2021-01-01",
	},

	{
		level: "difficult",
		count: 12,
		averageTime: 712,
		maxTime: 1700,
		minTime: 300,
		date: "2021-01-01",
	},
];

// TODO:スコアの表示
export default function ScorePage() {
	const scores = dscores;

	return (
		<Container size={"sm"} my={20}>
			<Paper p={"md"} shadow={"xs"}>
				<Group justify={"space-between"} mb={20}>
					<Title order={1}>統計</Title>
					<Flex gap={8}>
						<Button component={Link} href="/" leftSection={<TbHome2 />}>
							トップに戻る
						</Button>
						<Button component={Link} href="/score/easy" leftSection={<TbScoreboard />}>
							ランキング
						</Button>
					</Flex>
				</Group>

				<Tabs defaultValue="easy" variant="outline">
					<TabsList mb={16} justify="space-around">
						<TabsTab px={30} w={"33%"} value="easy">
							簡単
						</TabsTab>
						<TabsTab px={30} w={"33%"} value="normal">
							ふつう
						</TabsTab>
						<TabsTab px={30} w={"33%"} value="difficult">
							難しい
						</TabsTab>
					</TabsList>

					{scores.map((score) => (
						<TabsPanel value={score.level} key={score.level}>
							<Paper p="md" shadow="xs" mb={12}>
								<Group>
									<Text fw={"bold"}>ゲーム回数</Text>
									<Text>{score.count}回</Text>
								</Group>
							</Paper>
							<Paper p="md" shadow="xs" mb={12}>
								<Group>
									<Text fw={"bold"}>平均時間</Text>
									<Text>{formatTime(score.averageTime)}</Text>
								</Group>
							</Paper>
							<Paper p="md" shadow="xs" mb={12}>
								<Group>
									<Text fw={"bold"}>最短時間</Text>
									<Text>{formatTime(score.minTime)}</Text>
								</Group>
							</Paper>
							<Paper p="md" shadow="xs" mb={12}>
								<Group>
									<Text fw={"bold"}>最大時間</Text>
									<Text>{formatTime(score.maxTime)}</Text>
								</Group>
							</Paper>
						</TabsPanel>
					))}
				</Tabs>
			</Paper>
		</Container>
	);
}
