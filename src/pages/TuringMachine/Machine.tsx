import { FC, useEffect } from "react"
import useStyles from "./Styles"
import { Box, Palette, useTheme } from "@mui/material";
import Konva from "konva";
import Vector2 from "./Vector2";
import { config } from "./config";

let cellSize = 0;
var Width = 2500;
var Height = 0;
var stage = undefined;
const density = 25;
// var isMoving = false;
// var duration = 1;



function div(val: number, by: number): number {
    return (val - val % by) / by;
}


class Cell {
    position: Vector2;

    cell: Konva.Group;

    value: string;

    index: number

    constructor(position: Vector2, value: string, index: number, palette: Palette) {
        this.position = position;
        this.value = value;
        this.index = index;
        this.cell = new Konva.Group({
            x: this.position.x,
            y: this.position.y,
            width: cellSize,
            height: cellSize
        });

        this.cell.add(new Konva.Rect({
            width: cellSize,
            height: cellSize,
            stroke: palette.onSurface.main,
            strokeWidth: 2
        }));

        this.cell.add(new Konva.Text({
            text: this.value,
            fontFamily: "Roboto",
            fill: palette.onSurface.main,
            fontSize: 30,
            width: cellSize,
            height: cellSize,
            align: "center",
            verticalAlign: "middle",
            fontStyle: "bold"
        }))
    }

    attach(layer: Konva.Layer) {
        layer.add(this.cell);
    }
}



const Main = (palette: Palette) => {

    return () => {

        // var duration = 0.2;
        var canvas = document.getElementById("canvas");

        Width = canvas?.clientWidth || 0;
        Height = canvas?.clientHeight || 0;
        cellSize = div(Width, density);


        stage = new Konva.Stage({
            container: "canvas",
            width: Width,
            height: Height
        });

        var offset = 0;
        var layer = new Konva.Layer({x: offset, y: 0});
        stage.add(layer);
        
        var left: Cell[] = [];
        var middle: Cell[] = [];
        var right: Cell[] = [];

        const generateCells = (shift: number = 0): Cell[] => {
            let result = [];
            for (let i = 0; i < density; ++i) {
                let cell = new Cell(new Vector2(i * cellSize + shift, div(Height, 2) - div(cellSize, 2)), ("AB").toString(), i + div(shift, cellSize), palette);
                cell.attach(layer);
                result.push(cell);
            }
            return result;
        }

        const destroyCells = (cells: Cell[]) => {
            for (let i = 0; i < cells.length; ++i) {
                cells[i].cell.destroy();
            }
        }

        left = generateCells(-Width);
        middle = generateCells();
        right = generateCells(Width);

        const turnLeft = () => {
            offset -= Width;
            let twin = new Konva.Tween({
                node: layer,
                duration: config.duration,
                x: layer.getAbsolutePosition().x + Width,
                onFinish: () => {
                    destroyCells(right);
                    right = middle;
                    middle = left;
                    left = generateCells(offset - Width);
                    // isMoving = false;
                },
                easing: Konva.Easings.EaseInOut,
            });
            twin.play();
        }

        const turnRight = () => {
            offset += Width;
            let twin = new Konva.Tween({
                node: layer,
                duration: config.duration,
                x: layer.getAbsolutePosition().x - Width,
                onFinish: () => {
                    destroyCells(left);
                    left = middle;
                    middle = right;
                    right = generateCells(offset + Width);
                    // isMoving = false;
                },
                easing: Konva.Easings.EaseInOut,
            });
            twin.play();
        }

        // Cursor shape
        var cursor = new Konva.Group({
            x: 0,
            y: div(Height, 2) - div(cellSize, 2)
        });

        cursor.add(new Konva.Rect({
            width: cellSize,
            height: cellSize,
            stroke: palette.secondary.main,
            strokeWidth: 7,
            cornerRadius: 5
        }));

        cursor.add(new Konva.Line({
            points: [0, 0, 25, 50, 50, 0],
            closed: true,
            fill: palette.primary.main,
            x: 25,
            y: -70
        }));

        cursor.add(new Konva.Line({
            points: [0, 0, 25, -50, 50, 0],
            closed: true,
            fill: palette.primary.main,
            x: 25,
            y: cellSize + 70
        }));

        const cursorRight = () => {
            if (cursor.getPosition().x + cellSize >= -layer.getPosition().x + Width) {
                turnRight();
            }
            let tween = new Konva.Tween({
                node: cursor,
                x: cursor.getPosition().x + cellSize,
                duration: config.duration,
                onFinish: () => {
                    // isMoving = false;
                },
                easing: Konva.Easings.EaseInOut
            });
            tween.play();
        }

        const cursorLeft = () => {
            if (cursor.getPosition().x - cellSize < -layer.getPosition().x) {
                turnLeft();
            }
            let tween = new Konva.Tween({
                node: cursor,
                x: cursor.getPosition().x - cellSize,
                duration: config.duration,
                onFinish: () => {
                    // isMoving = false;
                },
                easing: Konva.Easings.EaseInOut
            });

            tween.play();
        }

        layer.add(cursor);

        // Event listening
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            // duration /= 2;
            if (e.code == "ArrowLeft") {
                cursorLeft();
                console.log("left");
            } else if (e.code == "ArrowRight") {
                console.log("right");
                cursorRight();
            } else {
                return;
            }
        });
    }
}


const Machine: FC = () => {
    const palette = useTheme().palette;
    const styles: any = useStyles().machine;
    useEffect(Main(palette), [palette]);

    return <Box id="canvas" sx={styles.root}>
    </Box>

}

export default Machine
