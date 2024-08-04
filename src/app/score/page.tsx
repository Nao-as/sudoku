import { getModeToal } from "@/util/supabase/score";
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

// TODO:スコアの表示
export default async function ScorePage() {
	const scores = await getModeToal();

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
						<TabsPanel value={score.mode} key={score.mode}>
							<Paper p="md" shadow="xs" mb={12}>
								<Group>
									<Text fw={"bold"}>ゲーム回数</Text>
									<Text>{score.gameCount}回</Text>
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
