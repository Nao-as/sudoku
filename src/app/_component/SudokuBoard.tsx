"use client";

import { Paper, Table } from "@mantine/core";
import { useCallback } from "react";

type Props = {
	board: number[][];
	errorCells: string[];
	selectedCell: { row: number; col: number } | null;
	setSelectedCell: React.Dispatch<
		React.SetStateAction<{ row: number; col: number } | null>
	>;
};

/**
 * 数独のボードを表示するコンポーネント
 *
 * @component
 * @param {number[][]} board - 数独のボード
 * @param {string[]} errorCells - エラーセルの配列
 * @param {React.Dispatch<React.SetStateAction<{ row: number; col: number } | null>} setSelectedCell - 選択されたセルを設定する関数
 * @param {{ row: number; col: number } | null} selectedCell - 選択されたセル
 *
 * @returns
 */
export const SudokuBoard = ({
	board,
	errorCells,
	setSelectedCell,
	selectedCell,
}: Props) => {
	// 空のセルのみ選択可能
	const handleCellClick = (row: number, col: number) => {
		if (board[row][col] === 0 || errorCells.includes(`${row}-${col}`)) {
			// 空のセルまたはエラーセルのみ選択可能
			setSelectedCell({ row, col });
		}
	};

	const getCellStyle = useCallback(
		(rowIndex: number, colIndex: number): React.CSSProperties => {
			const baseStyle: React.CSSProperties = {
				border: "1px solid #6f6f6f",
			};

			const thickBorderStyle = {
				borderLeftWidth: colIndex % 3 === 0 ? "3px" : "1px",
				borderTopWidth: rowIndex % 3 === 0 ? "3px" : "1px",
				borderRightWidth: colIndex === 8 ? "3px" : "1px",
				borderBottomWidth: rowIndex === 8 ? "3px" : "1px",
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
				errorCells.includes(`${rowIndex}-${colIndex}`)
			) {
				baseStyle.cursor = "pointer";
			}

			// エラーセルの文字色
			if (errorCells.includes(`${rowIndex}-${colIndex}`)) {
				baseStyle.color = "red";
				baseStyle.backgroundColor = "#f9d2d2";
			}

			return { ...baseStyle, ...thickBorderStyle };
		},
		[board, errorCells, selectedCell],
	);

	return (
		<Paper
			p={12}
			mt={8}
			style={{ boxShadow: "0 0 4px #7e7e7e", borderRadius: 4 }}
		>
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
									w={{ base: 40, md: 60 }}
									h={{ base: 40, md: 60 }}
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
		</Paper>
	);
};
