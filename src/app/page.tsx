import { Container, Stack, Title } from "@mantine/core";
import { SudokuInit } from "./_component/SudokuInit";

export default function Home() {
	//
	return (
		<Container>
			<Stack>
				<Title>数独アプリ</Title>

				<SudokuInit />
			</Stack>
		</Container>
	);
}
