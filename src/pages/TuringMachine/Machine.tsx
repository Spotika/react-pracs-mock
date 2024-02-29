import {Box, useTheme} from "@mui/material"
import React, {FC, MutableRefObject, SetStateAction, useEffect, useRef} from "react";
import useStyles from "./Styles.tsx"
import {TuringOptionsType} from "./ControlPanel.tsx";
import Konva from "konva";
import Cell from "./Cell.ts"
import {useHotkeys} from "react-hotkeys-hook";

const numberOfCells = 25;

function div(val: number, by: number): number {
    return (val - val % by) / by;
}

export type LineType = {
    [key: number]: string
}

export type ActionType =
    null |
    "step" |
    "render";


type Props = {
    line: LineType,
    turingOptions: TuringOptionsType,
    currentStateId: number,
    currentAction: ActionType,
    setCurrentAction: React.Dispatch<SetStateAction<ActionType>>,
    duration: number
}


const Machine: FC<Props> = ({
    line,
    turingOptions,
    currentAction,
    currentStateId,
    duration,
    setCurrentAction
                            }) => {
    const theme = useTheme();
    const styles = useStyles().machine;
    const canvasRef: MutableRefObject<HTMLDivElement | null>  = useRef(null);
    // let isMoving = false;
    let width = useRef(0);
    let height = useRef(0);
    let cellPositionY = useRef(0);

    let stage= useRef<Konva.Stage | null >(null);
    let mainLayer = useRef<Konva.Layer>();
    let cellSize = useRef(0);
    let pageOffset = useRef(0);
    let cursor = useRef<Konva.Group | null>(null);

    const parts = useRef<{
        "left": Cell[],
        "middle": Cell[],
        "right": Cell[],
    }>({
        "left": [],
        "middle": [],
        "right": []
    });

    const destroyCells = (cells: Cell[]) => {
        for (let i = 0; i < cells.length; ++i) {
            cells[i].cell.destroy();
        }
    }

    const generateCells = (shift: number = 0): Cell[] => {
        let result: Cell[] = [];
        for (let i = 0; i < numberOfCells; ++i) {
            let cell = new Cell(
                {
                    x: i * cellSize.current + shift * width.current,
                    y: cellPositionY.current
                },
                (i + shift * numberOfCells).toString(), // It is index of cell in line
                theme.palette,
                cellSize.current
            );
            if (mainLayer.current != null) {
                cell.attach(mainLayer.current);
            }
            result.push(cell);
        }
        return result;
    }

    const render = () => {
        width.current = div(canvasRef.current?.clientWidth || 0, numberOfCells) * numberOfCells;
        height.current = canvasRef.current?.clientHeight || 0;
        cellSize.current = div(width.current, numberOfCells);
        cellPositionY.current = div(height.current - cellSize.current, 2);

        stage.current = new Konva.Stage({
            container: "canvas",
            width: canvasRef.current?.clientWidth || 0,
            height: height.current,
        });

        mainLayer.current = new Konva.Layer();

        stage.current.add(mainLayer.current);

        parts.current.left = generateCells(-1);
        parts.current.middle = generateCells();
        parts.current.right = generateCells(1);

        // cursor
        cursor.current = new Konva.Group({
            x: 0,
            y: cellPositionY.current
        });

        cursor.current.add(new Konva.Line({
            points: [cellSize.current / 4, 0, cellSize.current / 2, cellSize.current / 2, cellSize.current * 3 / 4, 0],
            closed: true,
            fill: theme.palette.primary.main,
            x: 0,
            y: -cellSize.current / 2 - 20
        }));

        cursor.current.add(new Konva.Line({
            points: [cellSize.current / 4, 0, cellSize.current / 2, -cellSize.current / 2, cellSize.current * 3 / 4, 0],
            closed: true,
            fill: theme.palette.primary.main,
            x: 0,
            y: cellSize.current * 3 / 2 + 20
        }));

        cursor.current.add(new Konva.Rect({
            width: cellSize.current,
            height: cellSize.current,
            stroke: theme.palette.primary.main,
            strokeWidth: 7,
            cornerRadius: 5
        }));

        mainLayer.current?.add(cursor.current);
    }

    const turnPageLeft = () => {
        --pageOffset.current;
        if (mainLayer.current == null) return;
        let twin = new Konva.Tween({
            node: mainLayer.current,
            duration: duration,
            x: mainLayer.current?.getAbsolutePosition().x + width.current,
            easing: Konva.Easings.EaseInOut,
            onFinish: () => {
                destroyCells(parts.current.right);
                parts.current.right = parts.current.middle;
                parts.current.middle = parts.current.left;
                parts.current.left = generateCells(pageOffset.current - 1);
            }
        });
        twin.play();
    }

    const turnPageRight = () => {
        ++pageOffset.current;
        if (mainLayer.current == null) return;
        let twin = new Konva.Tween({
            node: mainLayer.current,
            duration: duration,
            x: mainLayer.current?.getAbsolutePosition().x - width.current,
            easing: Konva.Easings.EaseInOut,
            onFinish: () => {
                destroyCells(parts.current.left);
                parts.current.left = parts.current.middle;
                parts.current.middle = parts.current.right;
                parts.current.right = generateCells(pageOffset.current + 1);
            }
        });
        twin.play();
    }

    useEffect(() => {
        switch (currentAction) {
            case "render":
                render();
                break;
        }
        setCurrentAction(null);
    }, [currentAction, theme.palette]);

    useHotkeys("left", turnPageLeft);
    useHotkeys("right", turnPageRight);

    return <Box id="canvas" ref={canvasRef} sx={styles.root}>

    </Box>
}

export default Machine;