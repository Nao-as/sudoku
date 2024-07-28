import { Container, Title } from "@mantine/core";
import { SudokuInit } from "./SudokuInit";

export default function Home() {
	return (
		<Container>
			<Title>数独アプリ</Title>
			<p className="text-lg mt-4">数独を解いてみよう！</p>

			<SudokuInit />
		</Container>
	);
}
