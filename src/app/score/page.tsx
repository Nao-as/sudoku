import {
	ActionIcon,
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

// TODO:難易度設定
// TODO:認証機能の追加
// TODO:スコアの保存
// TODO:スコアの表示
//	- ランキング機能(自分のスコアがランキングに表示される)

const score = {
	level: "easy",
	time: "00:00:00",
	date: "2021-01-01",
};

export default function ScorePage() {
	//認証機能を追加する際には、このページを認証済みのユーザーのみがアクセスできるようにする

	return (
		<Container size={"sm"} my={20}>
			<Paper p={"md"} shadow={"xs"}>
				<Group justify={"space-between"} mb={20}>
					<Title order={1}>統計</Title>
					<Flex gap={8}>
						<Button component={Link} href="/" leftSection={<TbHome2 />}>
							トップに戻る
						</Button>
						<Button component={Link} href="/score/ranking/easy" leftSection={<TbScoreboard />}>
							ランキング
						</Button>
					</Flex>
				</Group>

				<Tabs defaultValue="chat" variant="outline">
					<TabsList mb={16} justify="space-around">
						<TabsTab px={30} w={"33%"} value="chat">
							簡単
						</TabsTab>
						<TabsTab px={30} w={"33%"} value="gallery">
							ふつう
						</TabsTab>
						<TabsTab px={30} w={"33%"} value="account">
							難しい
						</TabsTab>
					</TabsList>

					<TabsPanel value="chat" pb="xs">
						<Paper p="md" shadow="xs" mb={12}>
							<Group>
								<Text>ゲーム回数</Text>
								<Text>{score.date}回</Text>
							</Group>
						</Paper>
						<Paper p="md" shadow="xs" mb={12}>
							<Group>
								<Text>最短時間</Text>
								<Text>{score.date}</Text>
							</Group>
						</Paper>
						<Paper p="md" shadow="xs" mb={12}>
							<Group>
								<Text>平均時間</Text>
								<Text>{score.time}</Text>
							</Group>
						</Paper>
						<Paper p="md" shadow="xs" mb={12}>
							<Group>
								<Text>最大時間</Text>
								<Text>{score.time}</Text>
							</Group>
						</Paper>
					</TabsPanel>
					<TabsPanel value="gallery" pb="xs">
						<Paper p="md" shadow="xs" mb={12}>
							<Group>
								<Text>最短時間</Text>
								<Text>{score.date}</Text>
							</Group>
						</Paper>
						<Paper p="md" shadow="xs" mb={12}>
							<Group>
								<Text>平均時間</Text>
								<Text>{score.time}</Text>
							</Group>
						</Paper>
						<Paper p="md" shadow="xs" mb={12}>
							<Group>
								<Text>最大時間</Text>
								<Text>{score.time}</Text>
							</Group>
						</Paper>
					</TabsPanel>
					<TabsPanel value="account" pb="xs">
						<Paper p="md" shadow="xs" mb={12}>
							<Group>
								<Text>最短時間</Text>
								<Text>{score.date}</Text>
							</Group>
						</Paper>
						<Paper p="md" shadow="xs" mb={12}>
							<Group>
								<Text>平均時間</Text>
								<Text>{score.time}</Text>
							</Group>
						</Paper>
						<Paper p="md" shadow="xs" mb={12}>
							<Group>
								<Text>最大時間</Text>
								<Text>{score.time}</Text>
							</Group>
						</Paper>
					</TabsPanel>
				</Tabs>
			</Paper>
		</Container>
	);
}
