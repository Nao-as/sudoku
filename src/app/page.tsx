import { Container } from "@mantine/core";
import { SudokuInit } from "./_component/SudokuInit";

// TODO:難易度設定
// TODO:認証機能の追加
// TODO:スコアの保存
// TODO:スコアの表示
//	- ランキング機能(自分のスコアがランキングに表示される)

export default function Home() {
	//認証機能を追加する際には、このページを認証済みのユーザーのみがアクセスできるようにする

	return (
		<Container>
			<SudokuInit />
		</Container>
	);
}
