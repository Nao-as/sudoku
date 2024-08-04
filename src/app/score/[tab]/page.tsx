import { Button, Container, Group, Paper, Title } from "@mantine/core";
import ScoreBoard from "./client";
import Link from "next/link";
import { TbArrowBackUp } from "react-icons/tb";
import { getTotalScores } from "@/util/supabase/score";

export default async function ScorePage({
	params,
}: { params: { tab: "easy" | "normal" | "difficult" } }) {
	//認証機能を追加する際には、このページを認証済みのユーザーのみがアクセスできるようにする

	const scoreList = await getTotalScores(params.tab);

	return (
		<Container size={"sm"} my={20}>
			<Paper p={"md"} shadow={"xs"}>
				<Group justify={"space-between"} mb={20}>
					<Title order={1}>ランキング</Title>

					<Button component={Link} href="/score" leftSection={<TbArrowBackUp />}>
						スコア
					</Button>
				</Group>

				<ScoreBoard mode={params.tab} scores={scoreList} />
			</Paper>
		</Container>
	);
}
