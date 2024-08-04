import { Container } from "@mantine/core";
import { SudokuInit } from "./_component/SudokuInit";

// TODO:認証機能の追加
// TODO:スコアの保存
export default function Home() {
	//認証機能を追加する際には、このページを認証済みのユーザーのみがアクセスできるようにする

	return (
		<Container>
			<SudokuInit />
		</Container>
	);
}
