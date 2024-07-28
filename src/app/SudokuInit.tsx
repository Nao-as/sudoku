"use client";

import { generateSudoku, isValid } from "@/util/sudoke";
import { ActionIcon, Button, Group, Modal, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { TbTrash } from "react-icons/tb";

export const SudokuInit = () => {
	const [isStart, setIsStart] = useState<boolean>(false);
	const [board, setBoard] = useState<number[][]>([]);
	const [errorNum, setErrorNum] = useState<number>(0);
	const [selectedCell, setSelectedCell] = useState<{
		row: number;
		col: number;
	} | null>(null);
	const [errorCells, setErrorCells] = useState<string[]>([]); // エラーセルの管理
	const [timeElapsed, setTimeElapsed] = useState<number>(0); // 時間を秒単位で管理
	const [opened, setOpen] = useState(false);

	// ここに数独のロジックを書く
	useEffect(() => {
		if (!isStart) return;
		const generateBoard = generateSudoku();
		setBoard(generateBoard);
		setOpen(false);

		// タイマーを開始
		const timer = setInterval(() => {
			setTimeElapsed((prev) => prev + 1);
		}, 1000);

		return () => clearInterval(timer);
	}, [isStart]);

	useEffect(() => {
		if (errorNum >= 3) {
			setOpen(true);
			setIsStart(false);
			setErrorNum(0);
		}
	}, [errorNum]);

	// 空のセルのみ選択可能
	const handleCellClick = (row: number, col: number) => {
		if (board[row][col] === 0 || errorCells.includes(`${row}-${col}`)) {
			// 空のセルまたはエラーセルのみ選択可能
			setSelectedCell({ row, col });
		}
	};

	const getCellStyle = (
		rowIndex: number,
		colIndex: number,
	): React.CSSProperties => {
		const baseStyle: React.CSSProperties = {
			border: "1px solid black",
			boxSizing: "border-box",
			backgroundColor: "white",
			cursor: "default",
		};

		const thickBorderStyle = {
			borderLeftWidth: colIndex % 3 === 0 ? "2px" : "1px",
			borderTopWidth: rowIndex % 3 === 0 ? "2px" : "1px",
			borderRightWidth: colIndex === 8 ? "2px" : "1px",
			borderBottomWidth: rowIndex === 8 ? "2px" : "1px",
		};

		if (
			selectedCell &&
			selectedCell.row === rowIndex &&
			selectedCell.col === colIndex
		) {
			baseStyle.backgroundColor = "lightblue"; // 選択されたセルのハイライト
		}

		// 空のセルにカーソルスタイルを設定
		if (
			board[rowIndex][colIndex] === 0 ||
			// errorCells.has(`${rowIndex}-${colIndex}`)
			errorCells.includes(`${rowIndex}-${colIndex}`)
		) {
			baseStyle.cursor = "pointer";
		}

		// エラーセルの文字色
		if (errorCells.includes(`${rowIndex}-${colIndex}`)) baseStyle.color = "red";

		return { ...baseStyle, ...thickBorderStyle };
	};

	const handleNumberClick = (number: number) => {
		if (selectedCell) {
			const { row, col } = selectedCell;
			if (board[row][col] === 0) {
				const newBoard = board.map((rowArr, rowIndex) =>
					rowArr.map((cell, colIndex) =>
						rowIndex === row && colIndex === col ? number : cell,
					),
				);

				if (isValid(board, row, col, number)) {
					setBoard(newBoard);
					// setErrorCells(
					// 	(prev) =>
					// 		new Set([...prev].filter((cell) => cell !== `${row}-${col}`)),
					// );
					// setErrorCells((prev) =>
					// 	prev.filter((cell) => cell !== `${row}-${col}`),
					// );

					setErrorCells((prev) =>
						prev.filter((cell) => cell !== `${row}-${col}`),
					);
					setSelectedCell(null); // 選択解除
				} else {
					setBoard(newBoard);
					setErrorNum(errorNum + 1);
					// setErrorCells((prev) => new Set(prev).add(`${row}-${col}`));
					setErrorCells((prev) => [...prev, `${row}-${col}`]);
					setSelectedCell({ row, col });
				}
				// 正しい数値が入力された場合は再選択不可にする
				// if (isValid(newBoard, row, col, number)) {
				// }
			}
		}
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="">
				{!isStart ? (
					<Button onClick={() => setIsStart(true)}>問題を開始する</Button>
				) : (
					<>
						ミス数: {errorNum}/3 経過時間:{timeElapsed}秒
						<Table tabIndex={0}>
							<Table.Tbody>
								{board.map((row, rowIndex) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									<Table.Tr key={rowIndex}>
										{row.map((cell, colIndex) => (
											<Table.Td
												p={2}
												// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
												key={colIndex}
												w={60}
												h={60}
												ta={"center"}
												style={getCellStyle(rowIndex, colIndex)}
												onClick={() => handleCellClick(rowIndex, colIndex)}
											>
												{cell !== 0 ? cell : ""}
											</Table.Td>
										))}
									</Table.Tr>
								))}
							</Table.Tbody>
						</Table>
						<Group mt={12} justify="center" gap={8}>
							{/* deleteするボタン */}
							<ActionIcon color="gray" onClick={() => handleNumberClick(0)}>
								<TbTrash />
							</ActionIcon>
						</Group>
						<Group mt={12} justify="center" gap={8}>
							{Array.from({ length: 9 }, (_, i) => i + 1).map((number) => (
								<Button key={number} onClick={() => handleNumberClick(number)}>
									{number}
								</Button>
							))}
						</Group>
						{/*  */}
						<Modal
							opened={opened}
							onClose={() => {}}
							title="ゲームオーバー"
							closeOnClickOutside={false}
						>
							<Text>ゲームオーバーっすわ</Text>

							<Button onClick={() => setIsStart(false)}>
								もう一度プレイする
							</Button>
						</Modal>
					</>
				)}
			</div>
		</main>
	);
};
