"use client";

import { generateSudoku, isValid } from "@/util/sudoke";
import { ActionIcon, Button, Group, Text } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { TbTrash } from "react-icons/tb";
import { SudokuBoard } from "./SudokuBoard";
import { GameOverModal } from "./GameOverModal";
import { GameClearModal } from "./GameClearModal";
import { GameStartModal } from "./GameStartModal";
import { GameProgress } from "./GameProgress";

export const SudokuInit = () => {
	const [isStart, setIsStart] = useState<boolean>(false);
	const [board, setBoard] = useState<number[][]>([]);
	const [selectedCell, setSelectedCell] = useState<{
		row: number;
		col: number;
	} | null>(null);
	const [errorCells, setErrorCells] = useState<string[]>([]); // エラーセルの管理
	const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
	const [timeElapsed, setTimeElapsed] = useState<number>(0); // 時間を秒単位で管理
	const [isGameOver, setGameOver] = useState(false);
	const [isGameComplete, setIsGameComplete] = useState<boolean>(false); // ゲームクリア状態を管理
	const [disableNumberCounts, setDisableNumberCounts] = useState<
		Map<number, number>
	>(new Map()); // 数字の使用回数を管理

	// ここに数独のロジックを書く
	useEffect(() => {
		if (!isStart) return;
		const generateBoard = generateSudoku();
		setBoard(generateBoard);
		calculateNumberCounts(generateBoard);

		setSelectedCell(null);
		setErrorCells([]);
		setIsTimerRunning(true);
	}, [isStart]);

	const calculateNumberCounts = (board: number[][]) => {
		const counts = new Map<number, number>();
		// biome-ignore lint/complexity/noForEach: <explanation>
		board.forEach((row) => {
			// biome-ignore lint/complexity/noForEach: <explanation>
			row.forEach((num) => {
				if (num !== 0) {
					counts.set(num, (counts.get(num) || 0) + 1);
				}
			});
		});

		setDisableNumberCounts(counts);
	};

	useEffect(() => {
		let timerId: NodeJS.Timeout | null = null;

		if (isTimerRunning) {
			timerId = setInterval(() => {
				setTimeElapsed((prev) => prev + 1);
			}, 1000);
		} else if (!isTimerRunning && timeElapsed !== 0) {
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			clearInterval(timerId!);
		}

		return () => {
			if (timerId) clearInterval(timerId);
		};
	}, [isTimerRunning, timeElapsed]);

	const checkGameWin = useCallback(() => {
		if (board.length === 0) return false;
		if (errorCells.length === 3) return false;

		// すべてのセルが埋まっており、エラーがないことを確認
		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++) {
				if (board[row][col] === 0 || errorCells.includes(`${row}-${col}`)) {
					return false;
				}
			}
		}
		return true;
	}, [board, errorCells]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (checkGameWin()) {
			setIsGameComplete(true);
			setIsTimerRunning(false); // タイマーを停止
		}
	}, [board, errorCells, checkGameWin]);

	useEffect(() => {
		if (errorCells.length === 3) setGameOver(true);
	}, [errorCells]);

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
					calculateNumberCounts(newBoard);
				} else {
					setBoard(newBoard);
					setErrorCells((prev) => [...prev, `${row}-${col}`]);
					setSelectedCell({ row, col });
				}
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
				<GameStartModal setIsStart={() => setIsStart(true)} />
			) : (
				<>
					<GameProgress errorCells={errorCells} timeElapsed={timeElapsed} />

					<SudokuBoard
						board={board}
						selectedCell={selectedCell}
						errorCells={errorCells}
						setSelectedCell={setSelectedCell}
					/>

					{/* 操作ボタン */}
					<Group mt={12} justify="center" gap={8}>
						{/* delete */}
						<ActionIcon
							color="gray"
							onClick={() => deleteNumberClick()}
							w={{ base: 32, md: 48 }}
							h={{ base: 32, md: 48 }}
						>
							<TbTrash />
						</ActionIcon>
						{/* TODO:他のボタン機能の追加 */}
					</Group>
					<Group mt={12} justify="center" gap={6}>
						{Array.from({ length: 9 }, (_, i) => i + 1).map((number) => (
							<Button
								key={number}
								color="lime"
								onClick={() => handleNumberClick(number)}
								disabled={disableNumberCounts.get(number) === 9}
								w={{ base: 32, md: 48 }}
								h={{ base: 32, md: 48 }}
								fz={{ base: "xs", md: "lg" }}
								p={{ base: "xs", md: "sm" }}
							>
								{number}
							</Button>
						))}
					</Group>

					{/* ゲームオーバーモーダル */}
					<GameOverModal isGameOver={isGameOver} />
					{/* ゲームクリアモーダル */}
					<GameClearModal
						timeElapsed={timeElapsed}
						isGameComplete={isGameComplete}
						setIsGameComplete={setIsGameComplete}
					/>
				</>
			)}
		</div>
	);
};
