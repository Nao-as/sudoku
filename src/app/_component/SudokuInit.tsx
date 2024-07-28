"use client";

import { generateSudoku, isValid } from "@/util/sudoke";
import { ActionIcon, Button, Container, Group, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { TbTrash } from "react-icons/tb";
import { SudokuBoard } from "./SudokuBoard";
import { GameOverModal } from "./GameOverModal";

export const SudokuInit = () => {
	const [isStart, setIsStart] = useState<boolean>(false);
	const [board, setBoard] = useState<number[][]>([]);
	const [selectedCell, setSelectedCell] = useState<{
		row: number;
		col: number;
	} | null>(null);
	const [errorCells, setErrorCells] = useState<string[]>([]); // エラーセルの管理
	const [timeElapsed, setTimeElapsed] = useState<number>(0); // 時間を秒単位で管理
	const [open, setOpen] = useState(false);

	// ここに数独のロジックを書く
	useEffect(() => {
		if (!isStart) return;
		const generateBoard = generateSudoku();
		setBoard(generateBoard);
		setSelectedCell(null);
		setErrorCells([]);

		// タイマーを開始
		const timer = setInterval(() => {
			setTimeElapsed((prev) => prev + 1);
		}, 1000);

		return () => clearInterval(timer);
	}, [isStart]);

	useEffect(() => {
		if (errorCells.length === 3) setOpen(true);
	}, [errorCells]);

	const gameOver = () => {
		// console.log("ゲームオーバー");
		setIsStart(false);
		setOpen(false);
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
					setErrorCells((prev) =>
						prev.filter((cell) => cell !== `${row}-${col}`),
					);
					setSelectedCell(null); // 選択解除
				} else {
					setBoard(newBoard);
					setErrorCells((prev) => [...prev, `${row}-${col}`]);
					setSelectedCell({ row, col });
				}
				// 正しい数値が入力された場合は再選択不可にする
				// if (isValid(newBoard, row, col, number)) {
				// }
			}
		}
	};

	const deleteNumberClick = () => {
		if (selectedCell) {
			const { row, col } = selectedCell;
			if (board[row][col] !== 0) {
				const newBoard = board.map((rowArr, rowIndex) =>
					rowArr.map((cell, colIndex) =>
						rowIndex === row && colIndex === col ? 0 : cell,
					),
				);
				setBoard(newBoard);
			}
		}
	};

	return (
		<div className="">
			{!isStart ? (
				<Container>
					<Button onClick={() => setIsStart(true)}>問題を開始する</Button>
				</Container>
			) : (
				<>
					<Group p={8} mb={2} justify="right">
						<Text>ミス数: {errorCells.length}/3</Text>
						<Text>経過時間:{timeElapsed}秒</Text>
					</Group>

					<SudokuBoard
						board={board}
						selectedCell={selectedCell}
						errorCells={errorCells}
						setSelectedCell={setSelectedCell}
					/>

					{/* 操作ボタン */}
					<Group mt={12} justify="center" gap={8}>
						{/* deleteするボタン */}
						<ActionIcon color="gray" onClick={() => deleteNumberClick()}>
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

					<GameOverModal
						open={open}
						setOpen={setOpen}
						setIsStart={setIsStart}
					/>
				</>
			)}
		</div>
	);
};
