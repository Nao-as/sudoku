import type { Metadata } from "next";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";

export const metadata: Metadata = {
	title: "数独アプリ",
	description: "Generated by 数独アプリ",
};

const theme = createTheme({
	/** Put your mantine theme override here */
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body>
				<MantineProvider theme={theme} forceColorScheme="light">
					{children}
				</MantineProvider>
			</body>
		</html>
	);
}
